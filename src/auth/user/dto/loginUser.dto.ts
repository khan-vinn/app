import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class LoginUserDto {
  @Length(8)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8)
  @IsNotEmpty()
  password: string;
}
