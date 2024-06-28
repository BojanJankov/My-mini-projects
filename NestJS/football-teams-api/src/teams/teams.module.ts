import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TeamsController } from './teams.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Team } from './entities/teams.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Team])],
  providers: [TeamsService],
  controllers: [TeamsController],
})
export class TeamsModule {}
