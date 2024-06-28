import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manegers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  providers: [ManagersService],
  controllers: [ManagersController],
})
export class ManagersModule {}
