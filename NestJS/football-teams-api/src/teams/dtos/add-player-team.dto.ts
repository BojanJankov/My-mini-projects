import { IsString } from 'class-validator';

export class AddPlayerToTheTeamDto {
  @IsString()
  player: string;
}
