import { Controller } from '@nestjs/common';
import { PaymentsService } from './payments.service.js';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { CreateStripeIntentDTO } from '@app/common/auth/dto/create-stripe-intent.dto.js';

@Controller()
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @MessagePattern('create_charge')
  async createCharge(
    @Payload() data: CreateStripeIntentDTO,
    @Ctx() ctx: RmqContext,
  ) {
    const channel = ctx.getChannelRef();
    const originMsg = ctx.getMessage();

    // manually trigger
    channel.ack(originMsg);
    return this.paymentsService.createCharge(data);
  }
}
