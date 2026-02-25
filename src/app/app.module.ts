import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RecadosModule } from 'src/recados/recados.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PessoasModule } from 'src/pessoas/pessoas.module';
import { SimpleMiddleware } from 'src/common/middlewares/simple.middleware';
import { OutroMiddleware } from 'src/common/middlewares/outro.middleware';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { MyExceptionFilter } from 'src/common/filters/my-exception.filter';
import { ErrorExceptionFilter } from 'src/common/filters/error-exception.filter';
import { IsAdminGuard } from 'src/common/guards/is-admin.guard';

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
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ErrorExceptionFilter
    },
    {
      provide: APP_GUARD,
      useClass: IsAdminGuard
    }
  ],
})

// Aplicando o middleware globalmente
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SimpleMiddleware, OutroMiddleware).forRoutes({ // Pode usar 1 ou mais middlewares assim ou criando outro consumer.apply
      path: '*',                  //definindo quais rotas terão o middleware   
      method: RequestMethod.ALL  //definindo quais métodos HTTP dessas rotas terão o middleware
    })
  }
}
