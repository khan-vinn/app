import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { sign } from 'jsonwebtoken';
import { UserResponse } from './types/userResponse';
import { LoginUserDto } from './dto/loginUser.dto';
import { compare } from 'bcrypt';
import { compareSync } from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userByEmail = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    const userByName = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userByEmail || userByName) {
      throw new HttpException(
        'username or email taken',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);
    return await this.userRepository.save(newUser);
  }

  buildResponse(user: UserEntity): UserResponse {
    delete user.password;
    return {
      user: {
        ...user,
        token: this.generateJWT(user),
      },
    };
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      email: loginUserDto.email,
    });
    if (!user) {
      throw new HttpException(
        'password or login incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    if (!compareSync(loginUserDto.password, user.password)) {
      throw new HttpException(
        'password or login incorrect',
        HttpStatus.UNAUTHORIZED,
      );
    }
    return user;
  }

  generateJWT(user: UserEntity): string {
    return sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        bio: user.bio,
        image: user.image,
      },
      process.env.JWT_SECRET,
    );
  }
}
