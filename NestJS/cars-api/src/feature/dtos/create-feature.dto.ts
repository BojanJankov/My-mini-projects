import { IsString, Length } from 'class-validator';

export class CreateFeatureDto {
  @IsString()
  @Length(3, 30)
  name: string;

  @IsString()
  description: string;
}
