import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
// import { Type } from 'class-transformer';
// import { CardDTO } from './card.dto';
import { createChargeMessage } from '@app/common/types/payment.js';

export class CreateStripeIntentDTO implements createChargeMessage {
  // @IsDefined()
  // @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => CardDTO)
  // card: CardDTO;

  @IsNumber()
  amount: number;

  @IsEmail()
  email: string;
}
