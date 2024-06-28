import { IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class CreateManagerDto {
  @IsString()
  @Length(3, 30)
  firstName: string;

  @IsString()
  @Length(3, 30)
  lastName: string;

  @IsNumber()
  @Min(25)
  @Max(77)
  age: number;

  @IsNumber()
  @Min(0)
  salary: number;

  @IsNumber()
  @Min(0)
  yearsOfExperience: number;
}
