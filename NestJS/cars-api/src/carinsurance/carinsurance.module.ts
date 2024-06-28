import { Module } from '@nestjs/common';
import { CarinsuranceService } from './carinsurance.service';
import { CarinsuranceController } from './carinsurance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarInsurance } from './entities/car-insurance.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([CarInsurance]), UsersModule],
  providers: [CarinsuranceService],
  controllers: [CarinsuranceController],
  exports: [CarinsuranceService],
})
export class CarinsuranceModule {}
