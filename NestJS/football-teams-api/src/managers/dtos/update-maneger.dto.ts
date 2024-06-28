import { PartialType } from '@nestjs/mapped-types';
import { CreateManagerDto } from './create-maneger.dto';

export class UpdateManagerDto extends PartialType(CreateManagerDto) {}
