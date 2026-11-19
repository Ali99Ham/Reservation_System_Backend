import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto.js';
import { UpdateReservationDto } from './dto/update-reservation.dto.js';
import { ReservationRepository } from './reservation.repository.js';
import { PAYMENT_SERVICE } from '@app/common/auth/constant/index.js';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepository: ReservationRepository,
    @Inject(PAYMENT_SERVICE) private readonly paymentService: ClientProxy,
  ) {}

  async create(createReservationDto: CreateReservationDto, userId: string) {
    return this.paymentService
      .send('create_charge', createReservationDto.charge)
      .pipe(
        map((res) => async () => {
          return await this.reservationRepository.create({
            ...createReservationDto,
            timestamp: new Date(),
            invoiceId: res.id,
            userId,
          });
        }),
      );
  }

  async findAll() {
    return await this.reservationRepository.find({});
  }

  async findOne(_id: string) {
    return await this.reservationRepository.findOne({ _id });
  }

  async update(_id: string, updateReservationDto: UpdateReservationDto) {
    return await this.reservationRepository.findOneAndUpdate(
      { _id },
      { $set: updateReservationDto },
    );
  }

  async remove(_id: string) {
    return await this.reservationRepository.findAndDelete({ _id });
  }
}
