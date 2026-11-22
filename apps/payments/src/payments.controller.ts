import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateStripeIntentDTO } from '@app/common/auth/dto/create-stripe-intent.dto.js';
import {
  PaymentServiceController,
  PaymentServiceControllerMethods,
} from '@app/common/types/payment.js';

@Controller()
@PaymentServiceControllerMethods()
export class PaymentsController implements PaymentServiceController {
  constructor(private readonly paymentsService: PaymentsService) {}

  async createCharge(data: CreateStripeIntentDTO) {
    return this.paymentsService.createCharge(data);
  }
}
