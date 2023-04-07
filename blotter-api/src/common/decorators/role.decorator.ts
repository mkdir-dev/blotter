import { SetMetadata } from '@nestjs/common';
import { roleEnum } from 'src/users/enums/role.enum';

export const Role = (role: roleEnum) => SetMetadata('role', role);
