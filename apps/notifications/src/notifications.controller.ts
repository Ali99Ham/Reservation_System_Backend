import { Controller } from '@nestjs/common';
import { NotificationsService } from './notifications.service.js';
import { EventPattern, Payload } from '@nestjs/microservices';
import { NotifyEmailDTO } from './dto/notify-email.dto.js';
import { NotificationControllerMethods } from '../../../libs/common/src/types/notification';

@Controller()
@NotificationControllerMethods()
export class NotificationsController implements NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  async notifyEmail(@Payload() { email, text }: NotifyEmailDTO) {
    return this.notificationsService.notifyEmail({ email, text });
  }
}
