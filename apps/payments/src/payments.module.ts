import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from '@app/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '@app/common/constant/index.js';
import Stripe from 'stripe';

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
          transport: Transport.RMQ,
          options: {
            urls: [config.getOrThrow<string>('RabbitMQ_URL')],
            queue: 'notification',
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
