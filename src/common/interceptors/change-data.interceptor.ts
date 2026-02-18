import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { map} from "rxjs";

// ALTERANDO RESPOSTA
@Injectable()
export class ChangeDataInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler<any>){
        console.log('ChangeDataInterceptor executado ANTES');

        return next.handle().pipe(
            // Método para manipular os dados
            map(data => {
                if (Array.isArray(data)){
                    return {
                        data,
                        count: data.length
                    }
                }

                return data;
            })
        );
    }
}