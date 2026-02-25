// Cliente (Navegador) -> (Servidor) -> Middleware (Request, Response)
// -> NestJS (Guards, Interceptos, Pipes, Filters)

import { BadRequestException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class SimpleMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('SimpleMiddleware: Olá');

        // Exemplo simples de autenticação
        const authorization = req.headers?.authorization;
        if (authorization){
            //Modificando a req; para ter acessso aos dados da req inteiro, se utiliza o decorator @Req do nest common
            req['user'] = {         
                nome: 'Luiz',
                sobrenome: 'Otavio',
                role: 'user'
            };

            // Modificando o cabeçalho do response
            res.setHeader('CABECALHO', 'Do Middleware');

            // Passando para a proxima etapa 
            // Se nao quiser que o codigo após seja executado, basta usar o return 
            next();
            
            // O que vem depois do next() já conta como um outro middleware
            // Ou seja, quando executa todos os middlewares com next(), ele volta aqui e executa o que vem depois.
            console.log('SimpleMiddleware: Tchau')
        } else {
            // Também da para utilizar exceptions
            throw new BadRequestException('Bla bla bla');
        }

        // Terminando a cadeia de chamadas, ou seja, nem vai chegar a bater no Nest
        // return res.status(404).send({
        //     message: 'Não encontrado',
        // })
    }
}
