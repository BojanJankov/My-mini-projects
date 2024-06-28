import { Injectable, NotFoundException } from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { Match } from './entities/matches.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMatchDto } from './dtos/create-match.dto';
import { UpdateMatchDto } from './dtos/update-match.dto';
import { MatchFilters } from './interfaces/filters-interface';

@Injectable()
export class MatchesService {
  constructor(
    @InjectRepository(Match) private matchesRepo: Repository<Match>,
  ) {}

  async getAllMatches(filters: MatchFilters) {
    const filtersConfig: FindManyOptions<Match> = {};

    filtersConfig.take = filters.maxResults;
    filtersConfig.skip = filters.firstResult;

    if (filters.league) {
      filtersConfig.where = { league: filters.league };
    }

    if (filters.result) {
      filtersConfig.where = { ...filtersConfig.where, result: filters.result };
    }

    const matches = await this.matchesRepo.find(filtersConfig);
    const count = await this.matchesRepo.count();

    return {
      matches,
      totalRecords: count,
    };
  }

  async getMatchById(id: string) {
    const foundMatch = await this.matchesRepo.findOne({
      where: { id },
      relations: {
        players: true,
        referee: true,
      },
    });

    if (!foundMatch) throw new NotFoundException('Match Not Found');

    return foundMatch;
  }

  async createMatch(createMatchData: CreateMatchDto) {
    const newMatch = this.matchesRepo.create({
      ...createMatchData,
      players: createMatchData.players.map((playerId) => ({ id: playerId })),
      referee: { id: createMatchData.referee },
    });

    const createdMatch = await this.matchesRepo.save(newMatch);

    return createdMatch;
  }

  async updateMatch(id: string, updateMatchData: UpdateMatchDto) {
    const foundMatch = await this.getMatchById(id);

    Object.assign(foundMatch, updateMatchData);

    await this.matchesRepo.save(foundMatch);
  }

  async deleteMatch(id: string) {
    const foundMatch = await this.getMatchById(id);

    await this.matchesRepo.remove(foundMatch);
  }
}
