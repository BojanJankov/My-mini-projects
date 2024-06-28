import { IsNumber, IsString, Length } from 'class-validator';

export class CreateArtistDto {
  @IsString()
  @Length(3, 30)
  firstName: string;

  @IsString()
  @Length(3, 30)
  lastName: string;

  @IsString()
  @Length(1, 30)
  stageName: string;

  @IsNumber()
  age: number;
}
