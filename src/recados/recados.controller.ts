import { BadRequestException, Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Query, Req, UseInterceptors, UsePipes } from '@nestjs/common';
import { RecadosService } from './recados.service';
import { CreateRecadoDto } from './dto/create-recado.dto';
import { UpdateRecadoDto } from './dto/update-recado.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
import { AddHeaderInterceptor } from 'src/common/interceptors/add-header.interceptor';
import { TimingConnectionInterceptor } from 'src/common/interceptors/timing-connection.interceptor';
import { ErrorHandlingInterceptor } from 'src/common/interceptors/error-handling.interceptor';
import { ChangeDataInterceptor } from 'src/common/interceptors/change-data.interceptor';

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
    async findAll(@Query() paginationDTO: PaginationDTO, @Req() req: Request){  //acessando os dados da req
        console.log('RecadosController', req['user']); //acessando apenas o array que criamos no middleware 
        const recados = await this.recadosService.findAll(paginationDTO);
        return recados;
    }

    // Encontrar um recados
    @UseInterceptors(AddHeaderInterceptor, ErrorHandlingInterceptor)
    @Get(':id')
    findOne(@Param('id') id_referencia: number){
        return this.recadosService.findOne(id_referencia);
    }

    @Post()
    create(@Body() createRecadoDto: CreateRecadoDto) {
        return this.recadosService.create(createRecadoDto);
    }

    @Patch(':id')
    update(@Param('id') id: number, @Body() updateRecadoDto: UpdateRecadoDto){
        return this.recadosService.update(id, updateRecadoDto);
    }

    @Delete(':id')
    remove(@Param('id') id: number){
        return this.recadosService.remove(id);
    }
}
