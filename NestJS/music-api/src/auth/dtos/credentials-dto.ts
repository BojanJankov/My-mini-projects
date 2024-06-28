import { IsString, Length } from 'class-validator';

export class CreateCredentialsDto {
  @IsString()
  email: string;

  @IsString()
  password: string;
}
