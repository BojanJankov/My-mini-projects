import { PartialType } from '@nestjs/mapped-types';
import { CreateRefereeDto } from './create-referee.dto';

export class UpdateRefereeDto extends PartialType(CreateRefereeDto) {}
