import { NestFactory } from '@nestjs/core';
import { PaymentsModule } from './payments.module.js';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(PaymentsModule);
  const configService = app.get(ConfigService);
  await NestFactory.createMicroservice(PaymentsModule, {
    transport: Transport.TCP,
    options: {
      host: '0.0.0.0',
      port: configService.getOrThrow('TCP_PORT'),
    },
  });
  app.useLogger(app.get(Logger));
  app.startAllMicroservices();
}
await bootstrap();
