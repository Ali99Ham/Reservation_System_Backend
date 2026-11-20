import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateStripeIntentDTO } from '@app/common/auth/dto/create-stripe-intent.dto.js';
import { ClientProxy } from '@nestjs/microservices';
import { NOTIFICATION_SERVICE } from '@app/common/constant/index.js';

@Injectable()
export class PaymentsService {
  constructor(
    private readonly stripe: Stripe,
    @Inject(NOTIFICATION_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}

  async createCharge({ amount, email }: CreateStripeIntentDTO) {
    // const paymentMethod = await this.stripe.paymentMethods.create({
    //   type: 'card',
    //   card,
    // });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: 'pm_card_visa',
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
    });

    this.notificationsService.emit('notify_email', { email });

    return paymentIntent;
  }
}
