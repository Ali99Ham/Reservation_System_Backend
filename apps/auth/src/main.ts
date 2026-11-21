import { NestFactory } from '@nestjs/core';
import { AuthModule } from './auth.module.js';
import { ValidationPipe } from '@nestjs/common';
import { Logger } from 'nestjs-pino';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AuthModule);
  const config = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [config.getOrThrow('RabbitMQ_URL')],
      queue: 'auth',
    },
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useLogger(app.get(Logger));
  await app.startAllMicroservices();
  await app.listen(config.getOrThrow('HTTP_PORT'));
}
bootstrap();
