import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';

@Catch()
export class RpcToHttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcToHttpExceptionFilter.name);
  private readonly isProd = process.env.NODE_ENV === 'production';

  catch(exception: any, host: ArgumentsHost) {
    // Log full exception server-side for debugging/observability
    this.logger.error('Exception caught in RpcToHttpExceptionFilter', {
      exception: serializeErrorForLog(exception),
    });

    // HTTP context
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    // If the exception is already an HttpException, reuse its information.
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      safeSend(response, status, body);
      return;
    }

    // If microservice threw a shaped object { statusCode, message, error? }
    if (exception && typeof exception === 'object' && typeof exception.statusCode === 'number') {
      const status: number = Number(exception.statusCode) || HttpStatus.INTERNAL_SERVER_ERROR;
      const message = this.isProd ? genericMessageForStatus(status) : exception.message ?? exception?.error ?? 'Error';
      const body = buildResponseBody(status, message, exception);
      safeSend(response, status, body);
      return;
    }

    // If it's a plain error or unknown shape, map to 500
    const fallbackStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    const fallbackMessage = this.isProd ? 'Internal server error' : (exception?.message || 'Unexpected error');
    safeSend(response, fallbackStatus, { message: fallbackMessage });
  }
}

/* helpers */

// Ensure response.status(...).json(...) calls are safe (some adapters might differ)
function safeSend(response: any, status: number, body: any) {
  try {
    if (!response || typeof response.status !== 'function' || typeof response.json !== 'function') {
      // if response is weird, fallback to console logging
      // (shouldn't happen with standard HTTP servers)
      console.warn('Response object unexpected in RpcToHttpExceptionFilter', { status, body });
      return;
    }
    response.status(status).json(body);
  } catch (err) {
    // ultimate fallback: log and swallow (prevent crash)
    console.error('Failed to send HTTP response in RpcToHttpExceptionFilter', err);
  }
}

function buildResponseBody(status: number, message: string, exception: any) {
  // keep body simple and consistent
  const body: any = { statusCode: status, message };

  // in non-prod, include some helpful hints (but avoid full stack)
  if (process.env.NODE_ENV !== 'production') {
    if (exception?.error) body.error = exception.error;
    if (exception?.code) body.code = exception.code;
  }

  return body;
}

function genericMessageForStatus(status: number) {
  switch (status) {
    case 401: return 'Unauthorized';
    case 403: return 'Forbidden';
    case 404: return 'Not found';
    default: return 'Internal server error';
  }
}

function serializeErrorForLog(exception: any) {
  try {
    // avoid circular issues; pick useful fields
    return {
      name: exception?.name,
      message: exception?.message,
      statusCode: exception?.statusCode,
      stack: exception?.stack,
      payload: exception?.error ?? exception,
    };
  } catch {
    return { raw: String(exception) };
  }
}