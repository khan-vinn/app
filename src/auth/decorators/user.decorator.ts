import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { ExpressRequestI } from 'src/types/express.request';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<ExpressRequestI>();
    const user = request.user;
    if (!user) {
      return null;
    }
    if (data) {
      return user[data];
    }
    return user;
  },
);
