import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgres',
      port: 5432,
      username: 'nestuser',
      database: 'nestdb',
      password: 'nestpass',
      autoLoadEntities: true,  // Carrega entidades sem precisar especifica-las
      synchronize: true,       // Sincroniza com o BD. Não deve ser usado em produção
    }),
    RecadosModule,
    PessoasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
