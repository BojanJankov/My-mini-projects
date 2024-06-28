import { Module } from '@nestjs/common';
import { RefereesService } from './referees.service';
import { RefereesController } from './referees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Referee } from './entities/referee.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Referee])],
  providers: [RefereesService],
  controllers: [RefereesController],
})
export class RefereesModule {}
