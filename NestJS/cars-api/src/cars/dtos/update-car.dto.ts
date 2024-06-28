import { CreateCarDto } from './create-car.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateCarDto extends PartialType(CreateCarDto) {}
