import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Team } from 'src/teams/entities/teams.entity';

export class CreatePlayerDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsNumber()
  age: number;

  @IsNumber()
  salary: number;

  @IsNumber()
  yearsOfPlayingCareer: number;

  @IsString()
  @IsOptional()
  team: Team;
}
