import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller.js';
import { ReservationService } from './reservation.service.js';
import { ReservationsModule } from './reservations/reservations.module.js';
import { CommonModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ReservationsModule,
    CommonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['apps/reservation/.env', '.env'],
    }),
  ],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
