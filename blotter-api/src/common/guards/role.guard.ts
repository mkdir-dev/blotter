import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { roleEnum } from 'src/users/enums/role.enum';
import { RoleError } from '../errors/errors';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const role = this.reflector.get<roleEnum>('role', context.getHandler());
    const req = context.switchToHttp().getRequest();

    if (role !== req.user.role) {
      throw new ForbiddenException(RoleError.ForbiddenError);
    }

    return role === req.user.role;
  }
}
