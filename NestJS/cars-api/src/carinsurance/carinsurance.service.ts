import { Injectable, NotFoundException } from '@nestjs/common';
import { CarInsurance } from './entities/car-insurance.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCarInsurenceDto } from './dtos/create-carinsurence.dto';
import { UpdateCarInsurenceDto } from './dtos/update-carinsurence.dto';
import { CarInsuranceFitlers } from './interfaces/car-insurence-fitlers';

@Injectable()
export class CarinsuranceService {
  constructor(
    @InjectRepository(CarInsurance)
    private carInsurencesRepo: Repository<CarInsurance>,
  ) {}

  async getAllCarInsurances(filters: CarInsuranceFitlers) {
    const filtersConfig: FindManyOptions<CarInsurance> = {};

    filtersConfig.take = filters.maxResults;
    filtersConfig.skip = filters.firstResult;

    if (filters.policyNumber) {
      filtersConfig.where = { policyNumber: filters.policyNumber };
    }

    if (filters.provider) {
      filtersConfig.where = {
        ...filtersConfig.where,
        provider: filters.provider,
      };
    }

    if (filters.coverageDetalis) {
      filtersConfig.where = {
        ...filtersConfig.where,
        coverageDetalis: filters.coverageDetalis,
      };
    }

    const carsInsurences = await this.carInsurencesRepo.find(filtersConfig);
    const count = await this.carInsurencesRepo.count();

    return {
      carsInsurences,
      totalRecords: count,
    };
  }

  getCarInsurenceById(id: string) {
    const foundCarInsurence = this.carInsurencesRepo.findOne({
      where: { id },
      relations: {
        car: true,
      },
    });

    if (!foundCarInsurence)
      throw new NotFoundException('CarInsurence Not Found');

    return foundCarInsurence;
  }

  async createCarInsurence(carInsuranceData: CreateCarInsurenceDto) {
    const newCarInsurence = this.carInsurencesRepo.create({
      ...carInsuranceData,
      car: { id: carInsuranceData.car },
    });

    await this.carInsurencesRepo.save(newCarInsurence);
  }

  async updateCarInsurence(
    id: string,
    updateCarInsurenceData: UpdateCarInsurenceDto,
  ) {
    const foundCarInsurence = await this.getCarInsurenceById(id);

    Object.assign(foundCarInsurence, updateCarInsurenceData);

    await this.carInsurencesRepo.save(foundCarInsurence);
  }

  async deleteCarInsurence(id: string) {
    const foundCarInsurence = await this.getCarInsurenceById(id);

    await this.carInsurencesRepo.remove(foundCarInsurence);
  }
}
