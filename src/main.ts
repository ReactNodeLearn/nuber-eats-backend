import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // AppModule going to bring our db, service, sql, the we have to add graphql module in our app module
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
