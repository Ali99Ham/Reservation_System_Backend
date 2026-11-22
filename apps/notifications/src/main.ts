import { NestFactory } from '@nestjs/core';
import { NotificationsModule } from './notifications.module.js';
import { ConfigService } from '@nestjs/config';
import { Transport } from '@nestjs/microservices';
import { Logger } from 'nestjs-pino';
import { ValidationPipe } from '@nestjs/common';
import { NOTIFICATION_PACKAGE_NAME } from '@app/common/types/notification.js';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(NotificationsModule);
  const configService = app.get(ConfigService);
  await NestFactory.createMicroservice(NotificationsModule, {
    transport: Transport.GRPC,
    options: {
      package: NOTIFICATION_PACKAGE_NAME,
      protoPath: join(__dirname, '../../../proto/notification.proto'),
      url: configService.get<string>('NOTIFICATION_GRPC_URL'),
    },
  });
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(new ValidationPipe());
  app.startAllMicroservices();
}
bootstrap();
