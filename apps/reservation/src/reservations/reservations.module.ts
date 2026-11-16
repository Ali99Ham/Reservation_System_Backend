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

@Module({
  imports: [
    CommonModule,
    MongooseModule.forFeature([
      { name: ReservationDocument.name, schema: ReservationSchema },
    ]),
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService, ReservationRepository],
})
export class ReservationsModule {}
