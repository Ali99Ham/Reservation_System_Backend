import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { JWTAuthGuard } from './user/guards/jwt.guard.js';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JWTAuthGuard)
  @MessagePattern('authentication')
  async checkAuthenticate(@Payload() data: any) {
    return data.user;
  }
}
