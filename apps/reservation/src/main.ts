import { NestFactory } from '@nestjs/core';
import { ReservationModule } from './reservation.module.js';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(ReservationModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.listen(app.get(ConfigService).getOrThrow('PORT'));
}
bootstrap();
