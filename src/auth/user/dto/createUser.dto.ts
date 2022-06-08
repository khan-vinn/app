import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @Length(9, 15)
  readonly password: string;

  @IsOptional()
  @Length(5, 15)
  readonly username: string;
}
