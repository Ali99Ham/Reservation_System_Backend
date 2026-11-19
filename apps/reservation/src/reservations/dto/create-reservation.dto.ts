import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';
import { CreateStripeIntentDTO } from '@app/common/auth/dto/create-stripe-intent.dto.js';

export class CreateReservationDto {
  @IsDate()
  @Type(() => Date)
  startDate: Date;

  @IsDate()
  @Type(() => Date)
  endDate: Date;

  @Type(() => CreateStripeIntentDTO)
  charge: CreateStripeIntentDTO;
}
