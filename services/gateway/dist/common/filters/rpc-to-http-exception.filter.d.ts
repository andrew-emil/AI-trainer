import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare class RpcToHttpExceptionFilter implements ExceptionFilter {
    private readonly logger;
    private readonly isProd;
    catch(exception: any, host: ArgumentsHost): void;
}
