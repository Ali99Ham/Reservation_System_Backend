import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDTO } from './dto/notify-email.dto.js';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @EventPattern('notify_email')
  async notifyEmail(@Payload() { email, text }: NotifyEmailDTO) {
    return this.notificationsService.notifyEmail({ email, text });
  }
}
