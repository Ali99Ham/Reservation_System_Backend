import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UserService } from '../user.service.js';

export class LocalPassportStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UserService) {
    super({ usernameField: 'email' });
  }

  validate(email: string, passport: string) {
    return this.userService.verifyUser(email, passport);
  }
}
