import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { ReservationsService } from './reservations.service.js';
import { ReservationsController } from './reservations.controller.js';
import { CommonModule } from '@app/common';
import { ReservationRepository } from './reservation.repository.js';
import {
  ReservationDocument,
  ReservationSchema,
} from './models/reservation.schema.js';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE, PAYMENT_SERVICE } from '@app/common/constant/index.js';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    MongooseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.getOrThrow<string>('RabbitMQ_URL')],
            queue: 'auth',
          },
        }),
      },
      {
        name: PAYMENT_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.RMQ,
          options: {
            urls: [config.getOrThrow<string>('RabbitMQ_URL')],
            queue: 'payments',
          },
        }),
      },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
