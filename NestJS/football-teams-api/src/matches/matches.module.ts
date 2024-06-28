import { Module } from '@nestjs/common';
import { MatchesService } from './matches.service';
import { MatchesController } from './matches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Match } from './entities/matches.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Match])],
  providers: [MatchesService],
  controllers: [MatchesController],
})
export class MatchesModule {}
