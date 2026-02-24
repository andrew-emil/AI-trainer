"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var RpcToHttpExceptionFilter_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RpcToHttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
let RpcToHttpExceptionFilter = RpcToHttpExceptionFilter_1 = class RpcToHttpExceptionFilter {
    logger = new common_1.Logger(RpcToHttpExceptionFilter_1.name);
    isProd = process.env.NODE_ENV === 'production';
    catch(exception, host) {
        this.logger.error('Exception caught in RpcToHttpExceptionFilter', {
            exception: serializeErrorForLog(exception),
        });
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest?.();
        if (exception instanceof common_1.HttpException) {
            const status = exception.getStatus();
            const body = exception.getResponse();
            safeSend(response, status, body);
            return;
        }
        if (exception && typeof exception === 'object' && typeof exception.statusCode === 'number') {
            const status = Number(exception.statusCode) || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
            const message = this.isProd ? genericMessageForStatus(status) : exception.message ?? exception?.error ?? 'Error';
            const body = buildResponseBody(status, message, exception);
            safeSend(response, status, body);
            return;
        }
        const fallbackStatus = common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const fallbackMessage = this.isProd ? 'Internal server error' : (exception?.message || 'Unexpected error');
        safeSend(response, fallbackStatus, { message: fallbackMessage });
    }
};
exports.RpcToHttpExceptionFilter = RpcToHttpExceptionFilter;
exports.RpcToHttpExceptionFilter = RpcToHttpExceptionFilter = RpcToHttpExceptionFilter_1 = __decorate([
    (0, common_1.Catch)()
], RpcToHttpExceptionFilter);
function safeSend(response, status, body) {
    try {
        if (!response || typeof response.status !== 'function' || typeof response.json !== 'function') {
            console.warn('Response object unexpected in RpcToHttpExceptionFilter', { status, body });
            return;
        }
        response.status(status).json(body);
    }
    catch (err) {
        console.error('Failed to send HTTP response in RpcToHttpExceptionFilter', err);
    }
}
function buildResponseBody(status, message, exception) {
    const body = { statusCode: status, message };
    if (process.env.NODE_ENV !== 'production') {
        if (exception?.error)
            body.error = exception.error;
        if (exception?.code)
            body.code = exception.code;
    }
    return body;
}
function genericMessageForStatus(status) {
    switch (status) {
        case 401: return 'Unauthorized';
        case 403: return 'Forbidden';
        case 404: return 'Not found';
        default: return 'Internal server error';
    }
}
function serializeErrorForLog(exception) {
    try {
        return {
            name: exception?.name,
            message: exception?.message,
            statusCode: exception?.statusCode,
            stack: exception?.stack,
            payload: exception?.error ?? exception,
        };
    }
    catch {
        return { raw: String(exception) };
    }
}
//# sourceMappingURL=rpc-to-http-exception.filter.js.map