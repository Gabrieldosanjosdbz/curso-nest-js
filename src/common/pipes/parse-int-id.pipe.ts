import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";

@Injectable()
export class ParseIntIdPipe implements PipeTransform{
    transform(value: any, metadata: ArgumentMetadata) {
        if (metadata.type !== 'param' || metadata.data !== 'id'){
            // VALIDAÇÃO
            // se for diferente de param e id, retorno ele
            return value;
        }

        // TRANSFORMAÇÃO
        const parsedValue = Number(value);

        if(isNaN(parsedValue)){
            throw new BadRequestException(
                'ParseIntIdPipe espera uma string numérica'
            );
        }

        if (parsedValue < 0){
            throw new BadRequestException(
                'ParseIntIdPipe espera um numero maior que 0'
            );
        }

        return value;
    }
}