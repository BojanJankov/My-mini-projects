import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 20)
  firstName: string;

  @IsString()
  @Length(2, 20)
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  @Length(8, 30)
  password: string;
}
