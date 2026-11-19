import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller.js';
import { PaymentsService } from './payments.service.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from '@app/common';
import { Stripe } from 'stripe';

@Module({
  imports: [
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/payments/.env', '.env'],
    }),
  ],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    {
      provide: Stripe,
      useFactory: (configService: ConfigService) => ({
        key: configService.getOrThrow('STRIPE_KEY'),
      }),
      inject: [ConfigModule],
    },
  ],
})
export class PaymentsModule {}
