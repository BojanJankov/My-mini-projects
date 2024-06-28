import { IsArray, IsString } from 'class-validator';

export class CreateMatchDto {
  @IsString()
  result: string;

  @IsString()
  league: string;

  @IsArray()
  players: string[];

  @IsString()
  referee: string;
}
