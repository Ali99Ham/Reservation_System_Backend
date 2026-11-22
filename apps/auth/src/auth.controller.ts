import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { Payload } from '@nestjs/microservices';
import { JWTAuthGuard } from './user/guards/jwt.guard.js';
import {
  AuthControllerMethods,
  AuthSVCController,
} from '@app/common/types/auth.js';
import { Observable } from 'rxjs';

@Controller()
@AuthControllerMethods()
export class AuthController implements AuthSVCController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(JWTAuthGuard)
  async checkAuthenticate(@Payload() data: any) {
    return data.user;
  }
}
