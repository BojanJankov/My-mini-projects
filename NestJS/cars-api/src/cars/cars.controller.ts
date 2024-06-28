import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  HttpCode,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto } from './dtos/create-car.dto';
import { UpdateCarDto } from './dtos/update-car.dto';
import { CarFilters } from './interfaces/filters-interface';
import { AddFeatureToCarDto } from './dtos/add-feature-car.dto';
import { AuthGuard } from 'src/auth/auth.quard';

@UseGuards(AuthGuard)
@Controller('cars')
export class CarsController {
  constructor(private carsService: CarsService) {}

  @Get()
  getAllCars(
    @Query('make') make: string,
    @Query('model') model: string,
    @Query('manufacturer') manufacturer: string,
    @Query('petrol') petrol: string,
    @Query('orderBy') orderBy: 'year',
  ) {
    const filters: CarFilters = {
      make,
      model,
      orderBy,
      petrol,
      manufacturer,
    };

    return this.carsService.getAllCars(filters);
  }

  @Get('/:id')
  getCarById(@Param('id') id: string) {
    return this.carsService.getCarById(id);
  }

  @Post()
  createCar(@Body() carData: CreateCarDto) {
    return this.carsService.createCar(carData);
  }

  @Patch('/:id/features')
  addFeatureToCars(
    @Param('id') id: string,
    @Body() featureData: AddFeatureToCarDto,
  ) {
    return this.carsService.addFeatureToCar(id, featureData);
  }

  @Patch('/:id')
  updateCar(@Param('id') id: string, @Body() updateCarData: UpdateCarDto) {
    return this.carsService.updateCar(id, updateCarData);
  }

  @Get('/:id/features')
  listAllCarFeatures(@Param('id') id: string) {
    return this.carsService.listAllFeaturesOfCar(id);
  }

  @Delete('/:id/features/:featureId')
  deleteFeatureOfCar(
    @Param('id') carId: string,
    @Param('featureId') featureId: string,
  ) {
    return this.carsService.deleteFeatureOfCar(carId, featureId);
  }

  @Delete('/:id/carInsurence/:carInsurenceId')
  @HttpCode(204)
  deleteCar(
    @Param('id') id: string,
    @Param('carInsurenceId') carInsurenceId: string,
  ) {
    return this.carsService.deleteCar(id, carInsurenceId);
  }

  @Delete('/:id')
  deleteCarWithOutInsurence(@Param('id') id: string) {
    return this.carsService.deleteCarWithOutCarInsurence(id);
  }
}
