import { IsNumber, IsOptional, IsString, Length, Min } from 'class-validator';

export class CreateTeamDto {
  @IsString()
  @Length(2, 30)
  name: string;

  @IsString()
  @Length(2, 30)
  league: string;

  @IsNumber()
  year: number;

  @IsNumber()
  @Min(0)
  valueOfTeam: number;

  @IsNumber()
  @Min(0)
  trophies: number;

  @IsString()
  @IsOptional()
  manager: string;
}
