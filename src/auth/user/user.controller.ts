import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from '../guards/auth.guard';
import { UserResponse } from './types/userResponse';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { User } from '../decorators/user.decorator';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  @UsePipes(new ValidationPipe())
  async create(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<UserResponse> {
    const user = await this.userService.create(createUserDto);
    return this.userService.buildResponse(user);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<UserResponse> {
    const user = await this.userService.login(loginUserDto);
    return this.userService.buildResponse(user);
  }

  @Get('user')
  @UseGuards(AuthGuard)
  current(@User() user: UserEntity): UserResponse {
    return this.userService.buildResponse(user);
  }

  @Put('user')
  @UseGuards(AuthGuard)
  async update(
    @Body('user') updateUserDto: UpdateUserDto,
    @User('id') currentUserId: number,
  ): Promise<UserResponse> {
    const newUser = await this.userService.update(currentUserId, updateUserDto);
    return this.userService.buildResponse(newUser);
  }
}
