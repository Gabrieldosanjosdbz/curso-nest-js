import { Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities /recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]), PessoasModule], // importanto a entity no modulo e disponibilizando seu repository ; importando o module PessoasModule, assim, consigo utilizar providers que exporto no modulo
  controllers: [RecadosController],
  providers: [RecadosService]
})
export class RecadosModule {}
