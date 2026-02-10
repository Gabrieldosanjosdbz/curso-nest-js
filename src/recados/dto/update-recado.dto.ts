import { PartialType } from '@nestjs/mapped-types';
import { CreateRecadoDto } from './create-recado.dto';
import { IsBoolean, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

// PartialType clona os campos de um DTO (CreateRecadoDTO) para o outro deixando todos opcionais. 
export class UpdateRecadoDto extends PartialType(CreateRecadoDto){

    // Quando reescrevo um atributo, ele sobrescreve suas regras. 
    // @IsString()
    // @IsNotEmpty() 
    // @MinLength(5)
    // @MaxLength(255)
    // readonly texto: string;

    // Também posso criar novos atributos
    @IsBoolean()
    @IsOptional()
    readonly lido?: boolean;
}


