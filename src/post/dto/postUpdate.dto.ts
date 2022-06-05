import { IsNotEmpty, IsOptional, Length } from 'class-validator';

export class PostUpdateDto {
  @IsNotEmpty()
  @Length(1, 140)
  body: string;

  @IsOptional()
  @Length(1, 80)
  description: string;

  @IsOptional()
  image: string;
}
