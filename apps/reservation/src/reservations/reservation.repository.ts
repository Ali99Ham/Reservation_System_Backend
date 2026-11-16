import { AbstractRepo } from '@app/common/database/abstract.repository.js';
import { ReservationDocument } from './models/reservation.schema.js';
import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ReservationRepository extends AbstractRepo<ReservationDocument> {
  constructor(
    // NestJS is requested to inject the Mongoose model for Reservation.
    @InjectModel(ReservationDocument.name)
    reservationModel: Model<ReservationDocument>,
    logger: PinoLogger,
  ) {
    super(reservationModel, logger);
  }
}
