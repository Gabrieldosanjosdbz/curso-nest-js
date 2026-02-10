import { Type } from "class-transformer";
import { IsInt, IsOptional, Max, Min } from "class-validator";

export class PaginationDTO{
    @IsOptional()
    @IsInt()
    @Min(0)
    @Max(50)
    @Type(() => Number) //para forçar uma tipagem do tipo Number, tipo um transform
    limit: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    @Type(() => Number) //para forçar uma tipagem do tipo Number, tipo um transform
    offset: number;
}