// Cliente (Navegador) -> (Servidor) -> Middleware (Request, Response)
// -> NestJS (Guards, Interceptos, Pipes, Filters)

import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class OutroMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        console.log('OutroMiddleware: Olá');
        next();
    }
}
