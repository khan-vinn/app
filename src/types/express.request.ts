import { Request } from 'express';
import { UserEntity } from 'src/auth/user/user.entity';

export interface ExpressRequestI extends Request {
  user?: UserEntity;
}
