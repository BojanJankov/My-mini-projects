import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CarinsuranceService } from './carinsurance.service';
import { CreateCarInsurenceDto } from './dtos/create-carinsurence.dto';
import { UpdateCarInsurenceDto } from './dtos/update-carinsurence.dto';
import { AuthGuard } from 'src/auth/auth.quard';
import { CarInsuranceFitlers } from './interfaces/car-insurence-fitlers';

@UseGuards(AuthGuard)
@Controller('carinsurance')
export class CarinsuranceController {
  constructor(private carInsuranceService: CarinsuranceService) {}

  @Get()
  getAllCarInsurance(
    @Query('policyNumber') policyNumber: string,
    @Query('provider') provider: string,
    @Query('coverageDetalis') coverageDetalis: string,
    @Query('maxResults') maxResults: string,
    @Query('firstResult') firstResult: string,
  ) {
    const filters: CarInsuranceFitlers = {
      policyNumber,
      provider,
      coverageDetalis,
    };

    filters.maxResults = maxResults ? Number(maxResults) : 10;
    filters.firstResult = firstResult ? Number(firstResult) - 1 : 0;

    return this.carInsuranceService.getAllCarInsurances(filters);
  }

  @Get('/:id')
  getCarInsurenceById(@Param('id') id: string) {
    return this.carInsuranceService.getCarInsurenceById(id);
  }

  @Post()
  createCarInsurence(@Body() manufacturerData: CreateCarInsurenceDto) {
    return this.carInsuranceService.createCarInsurence(manufacturerData);
  }

  @Patch('/:id')
  updateCarInsurence(
    @Param('id') id: string,
    @Body() updateData: UpdateCarInsurenceDto,
  ) {
    return this.carInsuranceService.updateCarInsurence(id, updateData);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteCarInsurence(@Param('id') id: string) {
    return this.carInsuranceService.deleteCarInsurence(id);
  }
}
