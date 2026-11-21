import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module.js';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  await NestFactory.createMicroservice(PaymentsModule, {
    transport: Transport.RMQ,
    options: {
      urls: [configService.getOrThrow('RabbitMQ_URL')],
      queue: 'payments',
    },
  });
  app.useLogger(app.get(Logger));
  app.startAllMicroservices();
}
bootstrap();
