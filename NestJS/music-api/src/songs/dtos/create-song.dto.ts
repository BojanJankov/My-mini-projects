import { IsNumber, IsString } from 'class-validator';

export class CreateSongDto {
  @IsString()
  title: string;

  @IsNumber()
  duration: number;

  @IsString()
  year: string;

  @IsString()
  genre: string;

  @IsNumber()
  artistId: number;
}
