import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import { exec } from "child_process";

@Catch(HttpException)
export class MyExceptionFilter<T extends HttpException> implements ExceptionFilter{
    catch(exception: T, host: ArgumentsHost) {
        const context  = host.switchToHttp()
        const response = context.getResponse();
        const request  = context.getRequest();

        const exceptionResponse = exception.getResponse();

        const error = typeof response === 'string' ? {message: exceptionResponse} : (exception as Object)


        // modificando totalmente a resposta de um BadRequestException
        response.status(404).json({
            ...error,
            data: new Date().toISOString(),
            path: request.url,
        });
    }
}