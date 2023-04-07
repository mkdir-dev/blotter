import { roleEnum } from 'src/users/enums/role.enum';

export interface JwtPayload {
  sub: string;
  username: string;
  email: string;
  role: roleEnum;
}

export interface JwtPayloadWithRT extends JwtPayload {
  refreshToken?: string;
}
