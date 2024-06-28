import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Manager } from './entities/manegers.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateManagerDto } from './dtos/create-maneger.dto';
import { UpdateManagerDto } from './dtos/update-maneger.dto';
import { ManagerFilters } from './interfaces/filters-interface';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(Manager) private managersService: Repository<Manager>,
  ) {}

  async getAllManagers(filters: ManagerFilters) {
    const filtersConfig: FindManyOptions<Manager> = {};

    filtersConfig.take = filters.maxResults;
    filtersConfig.skip = filters.firstResult;

    if (filters.firstName) {
      filtersConfig.where = { firstName: filters.firstName };
    }

    if (filters.lastName) {
      filtersConfig.where = {
        ...filtersConfig.where,
        lastName: filters.lastName,
      };
    }

    if (filters.orderBy) {
      if (filters.orderBy === 'age') filtersConfig.order = { age: 'ASC' };
      if (filters.orderBy === 'salary') filtersConfig.order = { salary: 'ASC' };
      if (filters.orderBy === 'yearsOfExperience')
        filtersConfig.order = { yearsOfExperience: 'ASC' };
    }

    const managers = await this.managersService.find(filtersConfig);
    const count = await this.managersService.count();

    return {
      managers,
      totalRecords: count,
    };
  }

  async getManagerById(id: string) {
    const foundManager = await this.managersService.findOne({
      where: { id },
      relations: { team: true },
    });

    if (!foundManager) throw new NotFoundException('Manager Not Found');

    return foundManager;
  }

  createManager(createManagerData: CreateManagerDto) {
    return this.managersService.save(createManagerData);
  }

  async updateManager(id: string, updateManagerData: UpdateManagerDto) {
    const foundManager = await this.getManagerById(id);

    Object.assign(foundManager, updateManagerData);

    await this.managersService.save(foundManager);
  }

  async deleteManager(id: string) {
    const foundManager = await this.getManagerById(id);

    await this.managersService.remove(foundManager);
  }
}
