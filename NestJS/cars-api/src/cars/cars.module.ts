import { Module } from '@nestjs/common';
import { CarsController } from './cars.controller';
import { CarsService } from './cars.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { CarinsuranceModule } from 'src/carinsurance/carinsurance.module';
import { FeatureModule } from 'src/feature/feature.module';

import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Car]),
    CarinsuranceModule,
    FeatureModule,

    UsersModule,
  ],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
