import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '@app/common/constant/index.js';
import Stripe from 'stripe';
import { join } from 'path';
import { NOTIFICATION_PACKAGE_NAME } from '@app/common/types/notification.js';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/payments/.env', '.env'],
    }),
    ClientsModule.registerAsync([
      {
        inject: [ConfigService],
        name: NOTIFICATION_SERVICE,
        imports: [ConfigModule],
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            package: NOTIFICATION_PACKAGE_NAME,
            protoPath: join(__dirname, '../../../proto/notification.proto'),
            url: config.get<string>('NOTIFICATION_GRPC_URL'),
          },
        }),
      },
    ]),
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    {
      provide: Stripe,
      useFactory: (configService: ConfigService) => {
        return new Stripe(configService.getOrThrow('STRIPE_SECRET_KEY'));
      },
      inject: [ConfigService],
    },
  ],
})
export class PaymentsModule {}
