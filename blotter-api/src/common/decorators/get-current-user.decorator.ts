import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayloadWithRT } from 'src/auth/types/jwt-payload.type';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext): JwtPayloadWithRT => {
    const req = context.switchToHttp().getRequest();

    return req.user;
  },
);
