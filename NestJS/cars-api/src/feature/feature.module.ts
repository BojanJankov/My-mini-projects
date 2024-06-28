import { Module } from '@nestjs/common';
import { FeatureService } from './feature.service';
import { FeatureController } from './feature.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Feature]), UsersModule],
  providers: [FeatureService],
  controllers: [FeatureController],
  exports: [FeatureService],
})
export class FeatureModule {}
