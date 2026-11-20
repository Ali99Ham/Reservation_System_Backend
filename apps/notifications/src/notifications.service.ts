import { Injectable } from '@nestjs/common';
import { NotifyEmailDTO } from './dto/notify-email.dto.js';
import nodemailer, { type Transporter } from 'nodemailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificationsService {
  private readonly transporter: Transporter;
  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'oauth2',
        user: this.configService.getOrThrow('SMTP_USER'),
        clientId: this.configService.getOrThrow('OAUTH_GOOGLE_CLIENT_ID'),
        clientSecret: this.configService.getOrThrow(
          'OAUTH_GOOGLE_CLIENT_SECRET',
        ),
        refreshToken: this.configService.getOrThrow('REFRESH_TOKEN'),
      },
    });
  }

  async notifyEmail({ email, text }: NotifyEmailDTO) {
    this.transporter.sendMail({
      from: this.configService.getOrThrow('SMTP_USER'),
      to: email,
      subject: 'Reservation Notification',
      text: text,
    });
  }
}
