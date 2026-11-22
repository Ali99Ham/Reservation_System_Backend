import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateStripeIntentDTO } from '@app/common/auth/dto/create-stripe-intent.dto.js';
import type { ClientGrpc } from '@nestjs/microservices';
import {
  NOTIFICATION_SERVICE_NAME,
  NotificationClient,
} from '@app/common/types/notification';

@Injectable()
export class PaymentsService implements OnModuleInit {
  private readonly notificationService: NotificationClient;
  constructor(
    private readonly stripe: Stripe,
    @Inject(NOTIFICATION_SERVICE_NAME)
    private readonly notificationsServiceClient: ClientGrpc,
  ) {}

  onModuleInit() {
    this.notificationsServiceClient.getService<NotificationClient>(
      NOTIFICATION_SERVICE_NAME,
    );
  }

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

    this.notificationService.notifyEmail({ email });

    return paymentIntent;
  }
}
