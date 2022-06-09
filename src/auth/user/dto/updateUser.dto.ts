import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  readonly email: string;

  @IsOptional()
  @Length(5, 15)
  readonly username: string;

  @IsOptional()
  @Length(1, 140)
  readonly bio: string;

  @IsOptional()
  @Length(1, 140)
  readonly image: string;
}
