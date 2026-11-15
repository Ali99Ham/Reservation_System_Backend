import { Module } from '@nestjs/common';
import { ReservationController } from './reservation.controller.js';
import { ReservationService } from './reservation.service.js';
import { ReservationsModule } from './reservations/reservations.module.js';

@Module({
  imports: [ReservationsModule],
  controllers: [ReservationController],
  providers: [ReservationService],
})
export class ReservationModule {}
