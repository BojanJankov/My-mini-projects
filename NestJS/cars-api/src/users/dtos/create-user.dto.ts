import { IsEmail, IsOptional, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 30)
  firstName: string;

  @IsString()
  @Length(3, 30)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 30)
  password: string;

  @IsString()
  @IsOptional()
  refreshToken: string;
}
