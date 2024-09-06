import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { logger } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(); // Enable CORS for frontend integration
  const port = process.env.PORT || 3000;
  await app.listen(port);
  logger.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();