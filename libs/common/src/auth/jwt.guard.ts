import { CanActivate, ExecutionContext, Inject } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { Observable, tap, map } from 'rxjs';
import { AUTH_SERVICE } from '../constant/index.js';
import { UserDTO } from './dto/user.dto.js';
import { AUTH_SERVICE_NAME } from '../types/auth.js';
import { AuthClient } from '@app/common/types/auth.js';

export class JWTAuthGuard implements CanActivate {
  private readonly authService: AuthClient;
  constructor(@Inject(AUTH_SERVICE_NAME) private readonly client: ClientGrpc) {}

  onModuleInit() {
    this.client.getService<AuthClient>(AUTH_SERVICE_NAME);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization;

    if (!token) return false;

    return this.authService.authenticate({ Authentication: token }).pipe(
      tap((res) => (context.switchToHttp().getRequest().user = res)),
      map(() => true),
    );
  }
}
