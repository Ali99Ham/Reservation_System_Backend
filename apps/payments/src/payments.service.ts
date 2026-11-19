import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateStripeIntentDTO } from './dto/create-stripe-intent.dto.js';

@Injectable()
export class PaymentsService {
  constructor(private readonly stripe: Stripe) {}

  async createCharge({ card, amount }: CreateStripeIntentDTO) {
    const paymentMethod = await this.stripe.paymentMethods.create({
      type: 'card',
      card,
    });

    const paymentIntent = await this.stripe.paymentIntents.create({
      payment_method: paymentMethod.id,
      amount: amount * 100,
      confirm: true,
      currency: 'usd',
    });

    return paymentIntent;
  }
}
