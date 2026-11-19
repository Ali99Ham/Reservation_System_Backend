import Stripe from 'stripe';

export class CreateStripeIntentDTO {
  card: Stripe.PaymentMethodCreateParams.Card;
  amount: number;
}
