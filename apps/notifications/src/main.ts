import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module.js';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);
  await NestFactory.createMicroservice(NotificationsModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.getOrThrow('TCP_PORT'),
    },
  });
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  app.startAllMicroservices();
}
await bootstrap();
