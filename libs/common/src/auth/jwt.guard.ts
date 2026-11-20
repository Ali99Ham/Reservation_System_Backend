import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable, tap, map } from 'rxjs';
import { AUTH_SERVICE } from '../constant/index.js';
import { UserDTO } from './dto/user.dto.js';

export class JWTAuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private readonly client: ClientProxy) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) return false;

    return this.client
      .send<UserDTO>('authentication', { Authentication: token })
      .pipe(
        tap((res) => (context.switchToHttp().getRequest().user = res)),
        map(() => true),
      );
  }
}
