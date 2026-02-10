import { IsNotEmpty, IsPositive, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRecadoDto {

    // decorators class-validator
    @IsString({message: 'Mudando msg'})
    @IsNotEmpty() //IsOptional() coloca o campo como opcional.
    @MinLength(5)
    @MaxLength(255)
    readonly texto: string;

    @IsPositive()
    deId: number;

    @IsPositive()
    paraId: number;
}
