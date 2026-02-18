import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { ValidationPipe } from '@nestjs/common';
import { ParseIntIdPipe } from './common/pipes/parse-int-id.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // configurando global pipes
  app.useGlobalPipes(new ValidationPipe({
      whitelist: true, // remove chaves que não estão no DTO.
      forbidNonWhitelisted: true, // disparar erro quando a chave não existir
      transform: true,  // tenta transformar os tipos de dados de param em dtos
    }),
    new ParseIntIdPipe()
  );

  app.useGlobalInterceptors
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
