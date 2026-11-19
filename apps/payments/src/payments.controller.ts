import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateStripeIntentDTO } from './dto/create-stripe-intent.dto.js';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  async createCharge(@Payload() data: CreateStripeIntentDTO) {
    return this.paymentsService.createCharge(data);
  }
}
