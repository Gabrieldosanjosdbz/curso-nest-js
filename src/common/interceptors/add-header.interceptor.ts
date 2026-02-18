import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";

// MUDANDO HEADER DA REQ
@Injectable()
export class AddHeaderInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        const response = context.switchToHttp().getResponse();

        response.setHeader('X-Custom-Header', 'O valor do cabeçalho');
        return next.handle();   
    }
}