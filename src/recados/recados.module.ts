import { forwardRef, Module } from '@nestjs/common';
import { RecadosController } from './recados.controller';
import { RecadosService } from './recados.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Recado } from './entities /recado.entity';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { RecadosUtils } from './recados.utils';

@Module({
  imports: [TypeOrmModule.forFeature([Recado]), forwardRef(() => PessoasModule)], // importanto a entity no modulo e disponibilizando seu repository ; importando o module PessoasModule, assim, consigo utilizar providers que exporto no modulo
  controllers: [RecadosController],
  providers: [
    RecadosService, 
    {
      provide: RecadosUtils,
      useClass: RecadosUtils
    }
  ],
  exports: [
    {
      provide: RecadosUtils,
      useClass: RecadosUtils
    }
  ]
})
export class RecadosModule {}
