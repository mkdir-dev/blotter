import { roleEnum } from 'src/users/enums/role.enum';

export class GetTokenDto {
  id: string;
  username: string;
  email: string;
  role: roleEnum;
}
