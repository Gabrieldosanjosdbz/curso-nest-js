import { forwardRef, Module } from '@nestjs/common';
import { PessoasService } from './pessoas.service';
import { PessoasController } from './pessoas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pessoa } from './entities/pessoa.entity';
import { RecadosModule } from 'src/recados/recados.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pessoa]), forwardRef(() => RecadosModule)],
  controllers: [PessoasController],
  providers: [PessoasService],
  exports: [PessoasService] // exportando a service para usar em outro modulo 
})
export class PessoasModule {}
