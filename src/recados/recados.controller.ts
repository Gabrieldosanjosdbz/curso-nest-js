import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

// CRUD
// Create -> POST        -> Criar um recado
// Read   -> GET         -> Ler todos os recados
// Read   -> GET         -> Ler apenas um recado
// Update -> PATCH / PUT -> Atualizar um recado
// Delete -> DELETE      -> Apagar um recado

// PATCH é utilizado para atualizar dados de um recurso
// PUT é utilizado para atualizar um recurso inteiro

// DTO - Data Transfer Object -> Objeto de transferencia de dados
// DTO - Objeto simples -> Validar dados / Transformar dados

@Controller('recados')
export class RecadosController {
    constructor(private readonly recadosService: RecadosService){}

    // Encontrar todos os recados
    @HttpCode(HttpStatus.OK)
    @Get()
    async findAll(@Query() paginationDTO: PaginationDTO){
        // return `Essa rota retorna todos os recados. Limite=${limit}, Offset=${offset}`;
        const recados = await this.recadosService.findAll(paginationDTO);
        return recados;
    }

    // Encontrar um recados
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id_referencia: number){
        return this.recadosService.findOne(id_referencia);
    }

    @Post()
    create(@Body() createRecadoDto: CreateRecadoDto) {
        return this.recadosService.create(createRecadoDto);
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() updateRecadoDto: UpdateRecadoDto){
        return this.recadosService.update(id, updateRecadoDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number){
        return this.recadosService.remove(id);
    }
}
