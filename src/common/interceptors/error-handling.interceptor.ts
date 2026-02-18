import { BadRequestException, CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { catchError, Observable, tap, throwError } from "rxjs";

// ALTERANDO EXCEPTIONS
@Injectable()
export class ErrorHandlingInterceptor implements NestInterceptor{
    async intercept(context: ExecutionContext, next: CallHandler<any>){
        console.log('ErrorHandlingInterceptor executado ANTES');

        // await new Promise(resolve => setTimeout(resolve, 5000));

        return next.handle().pipe(
            catchError((error) => {
                return throwError(() => {
                    if(error.name === 'NotFoundException') {
                        // aqui, por ja estar retornando um throwError
                        // você pode usar tanto throw, quanto return.
                        throw new BadRequestException(error.message) // mudando notFound para BadRequest.
                    }

                    throw new BadRequestException('Ocorreu um erro desconhecido');
                });
            }),
        );
    }
}