import { IsString } from 'class-validator';

export class AddMatchToRefereeDto {
  @IsString()
  match: string;
}
