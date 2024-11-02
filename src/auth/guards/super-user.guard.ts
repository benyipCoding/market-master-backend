import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class SuperUserGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    return request.user.is_superuser;
  }
}
