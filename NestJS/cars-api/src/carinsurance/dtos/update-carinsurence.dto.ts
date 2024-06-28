import { PartialType } from '@nestjs/mapped-types';
import { CreateCarInsurenceDto } from './create-carinsurence.dto';

export class UpdateCarInsurenceDto extends PartialType(CreateCarInsurenceDto) {}
