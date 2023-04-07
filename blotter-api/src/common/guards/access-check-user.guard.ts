import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

import { roleEnum } from 'src/users/enums/role.enum';
import { RoleError } from '../errors/errors';

@Injectable()
export class AccessCheckUserGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const req = context.switchToHttp().getRequest();
    const { role, sub } = req.user;
    const { id } = req.params;

    if (role !== roleEnum.user) return true;

    if (sub !== id) {
      throw new ForbiddenException(RoleError.ForbiddenError);
    }

    return sub === id;
  }
}
