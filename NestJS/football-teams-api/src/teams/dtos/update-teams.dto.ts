import { PartialType } from '@nestjs/mapped-types';
import { CreateTeamDto } from './create-teams.dto';

export class UpdateTeamDto extends PartialType(CreateTeamDto) {}
