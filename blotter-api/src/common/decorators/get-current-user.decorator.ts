import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { JwtPayloadWithRT } from 'src/auth/types/jwt-payload.type';

export const GetCurrentUser = createParamDecorator(
  (
    data: string | undefined, // keyof JwtPayloadWithRT | undefined,
    context: ExecutionContext,
  ): JwtPayloadWithRT => {
    const req = context.switchToHttp().getRequest();

    console.log('data', { data, resdata: req.user[data] });
    console.log('req.user', req.user);

    return req.user;

    /*
    console.log('req', {
      data: {
        ...req.user,
        sub: req.user[data],
      },
      req: req.user,
    });

    if (data) return req.user;

    return {
      ...req.user,
      data,
    };
    */
  },
);
