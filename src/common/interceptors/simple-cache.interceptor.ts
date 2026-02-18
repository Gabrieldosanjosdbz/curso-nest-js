import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { of, tap } from "rxjs";

// SALVANDO CACHE
@Injectable()
export class SimpleCacheInterceptor implements NestInterceptor{
    // estrutura de dados de coleção que armazena pares chave-valor
    private readonly cache = new Map();

    intercept(context: ExecutionContext, next: CallHandler<any>){
        console.log('SimpleCacheInterceptor executado ANTES');
        const url = context.switchToHttp().getRequest().url;

        if(this.cache.has(url)){
            console.log('Está no cache', url);
            // Of é para retornar um objeto como Observer
            return of(this.cache.get(url));
        }

        return next.handle().pipe(
            tap(data => {
                this.cache.set(url, data);
                console.log("Armazenado em cache", url);
            })
        );
    }
}