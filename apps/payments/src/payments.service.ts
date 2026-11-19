import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateStripeIntentDTO } from '@app/common/auth/dto/create-stripe-intent.dto.js';

@Injectable()
export class PaymentsService {
  constructor(private readonly stripe: Stripe) {}

  async createCharge({ amount }: CreateStripeIntentDTO) {
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

    return paymentIntent;
  }
}
