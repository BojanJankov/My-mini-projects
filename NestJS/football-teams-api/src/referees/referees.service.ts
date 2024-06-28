import { Injectable, NotFoundException } from '@nestjs/common';
import { Referee } from './entities/referee.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateRefereeDto } from './dtos/create-referee.dto';
import { UpdateRefereeDto } from './dtos/update-referee.dto';
import { AddMatchToRefereeDto } from './dtos/add-matches-referee.dto';
import { RefereeFilters } from './interfaces/filters-interface';

@Injectable()
export class RefereesService {
  constructor(
    @InjectRepository(Referee) private refereesRepo: Repository<Referee>,
  ) {}

  async getAllReferees(filters: RefereeFilters) {
    const filtersConfig: FindManyOptions<Referee> = {};

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
    const referees = await this.refereesRepo.find(filtersConfig);
    const count = await this.refereesRepo.count();

    return {
      referees,
      totalRecords: count,
    };
  }

  getRefereeById(id: string) {
    const foundReferee = this.refereesRepo.findOne({
      where: { id },
      relations: { matches: true },
    });

    if (!foundReferee) throw new NotFoundException('Manager Not Found');

    return foundReferee;
  }

  createReferee(createRefereeData: CreateRefereeDto) {
    return this.refereesRepo.save(createRefereeData);
  }

  async listAllMatchesFromReferee(id: string) {
    const foundReferee = await this.getRefereeById(id);

    return foundReferee.matches;
  }

  async addMatchToReferee(id: string, addMatchToReferee: AddMatchToRefereeDto) {
    const foundReferee = await this.getRefereeById(id);

    await this.refereesRepo.save({
      ...foundReferee,
      matches: [...foundReferee.matches, { id: addMatchToReferee.match }],
    });
  }

  async updateReferee(id: string, updateRefereeData: UpdateRefereeDto) {
    const foundReferee = await this.getRefereeById(id);

    Object.assign(foundReferee, updateRefereeData);

    await this.refereesRepo.save(foundReferee);
  }

  async deleteReferee(id: string) {
    const foundReferee = await this.getRefereeById(id);

    await this.refereesRepo.remove(foundReferee);
  }

  async deleteMatchFromReferee(refereeId: string, matchId: string) {
    const foundReferee = await this.getRefereeById(refereeId);

    foundReferee.matches = foundReferee.matches.filter(
      (match) => matchId !== match.id,
    );

    await this.refereesRepo.save(foundReferee);
  }
}
