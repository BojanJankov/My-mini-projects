import { IsString } from 'class-validator';

export class AddFeatureToCarDto {
  @IsString()
  feature: string;
}
