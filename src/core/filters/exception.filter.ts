import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BusinessException } from '../exceptions/business-exception';


@Catch()
export class AllExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) { }

    catch(exception: HttpException, host: ArgumentsHost) {
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();
        let statusCode = typeof exception.getStatus === "function" ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;

        const message = exception instanceof BusinessException
            ? exception.message
            : "Houve um problema com sua requisição. Caso persista contate o suporte"


        const responseBody = {
            statusCode,
            timestamp: new Date().toISOString(),
            path: httpAdapter.getRequestUrl(ctx.getRequest()),
            message: message
        };

        console.log(exception);
        console.log(exception.message);
        httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
    }
}