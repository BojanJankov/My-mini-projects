import {
  IsOptional,
  IsString,
  Length,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateCarInsurenceDto {
  @IsString()
  @MinLength(8)
  @MaxLength(8)
  policyNumber: string;

  @IsString()
  @Length(3, 20)
  provider: string;

  @IsString()
  @Length(3, 20)
  coverageDetalis: string;

  @IsString()
  @IsOptional()
  car: string;
}
