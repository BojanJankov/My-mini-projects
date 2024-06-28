import { Type } from 'class-transformer';
import {
  IsString,
  IsNumber,
  Length,
  IsObject,
  ValidateNested,
} from 'class-validator';
import { CreateCarInsurenceDto } from 'src/carinsurance/dtos/create-carinsurence.dto';

export class CreateCarDto {
  @IsString()
  make: string;

  @IsString()
  @Length(2, 20)
  model: string;

  @IsString()
  @Length(2, 20)
  manufacturer: string;

  @IsString()
  @Length(2, 20)
  petrol: string;

  @IsString()
  year: string;

  @IsObject()
  @ValidateNested()
  @Type(() => CreateCarInsurenceDto)
  carInsurance: CreateCarInsurenceDto;
}
