import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { ExpressRequestI } from 'src/types/express.request';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}
  async use(
    req: ExpressRequestI,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      req.user = null;
      next();
      return;
    }
    try {
      const decodedUser = verify(token, process.env.JWT_SECRET) as UserEntity;
      const user: UserEntity = await this.userService.findById(decodedUser.id);
      req.user = user;
      next();
      return;
    } catch (error) {
      req.user = null;
      next();
      return;
    }
  }
}
