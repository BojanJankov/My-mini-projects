import { IsArray, IsNumber, IsString } from 'class-validator';
import { Album } from '../entities/album.entity';

export class CreateAlbumDto {
  @IsString()
  title: string;

  @IsString()
  genre: string;

  @IsNumber()
  artistId: number;

  @IsString()
  year: string;

  @IsNumber()
  numberOfSales: number;

  @IsNumber({}, { each: true })
  songs: number[];
}
