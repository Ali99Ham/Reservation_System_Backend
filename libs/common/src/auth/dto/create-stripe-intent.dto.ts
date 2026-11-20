import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  ValidateNested,
} from 'class-validator';
// import { Type } from 'class-transformer';
// import { CardDTO } from './card.dto';

export class CreateStripeIntentDTO {
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
