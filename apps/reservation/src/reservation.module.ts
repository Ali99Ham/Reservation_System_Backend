import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller.js';
import { ReservationService } from './reservation.service.js';
import { ReservationsModule } from './reservations/reservations.module.js';
import { LoggerModule } from 'nestjs-pino';

@Module({
  imports: [ReservationsModule, LoggerModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
