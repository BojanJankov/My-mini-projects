import { PartialType } from '@nestjs/mapped-types';
import { CreatePlayerDto } from './create-players.dto';

export class UpdatePlayerDto extends PartialType(CreatePlayerDto) {}
