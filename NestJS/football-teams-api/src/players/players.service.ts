import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreatePlayerDto } from './dtos/create-players.dto';
import { UpdatePlayerDto } from './dtos/update-players.dto';
import { PlayerFilters } from './interfaces/filters-interface';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player) private playersRepo: Repository<Player>,
  ) {}

  async getAllPlayers(filters: PlayerFilters) {
    const filtersConfig: FindManyOptions<Player> = {};

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
      if (filters.orderBy === 'yearsOfPlayingCareer')
        filtersConfig.order = { yearsOfPlayingCareer: 'ASC' };
    }

    const players = await this.playersRepo.find(filtersConfig);
    const count = await this.playersRepo.count();

    return {
      players,
      totalRecords: count,
    };
  }

  getPlayerById(id: string) {
    const foundPlayer = this.playersRepo.findOne({
      where: { id },
      relations: {
        team: true,
        matches: true,
      },
    });

    if (!foundPlayer) throw new NotFoundException('PLayer Not Found');

    return foundPlayer;
  }

  async createPlayer(createPlayerData: CreatePlayerDto) {
    const newPlayer = await this.playersRepo.save(createPlayerData);

    return newPlayer;
  }

  async updatePlayer(id: string, updatePlayerData: UpdatePlayerDto) {
    const foundPlayer = await this.getPlayerById(id);

    Object.assign(foundPlayer, updatePlayerData);

    return foundPlayer;
  }

  async deletePlayer(id: string) {
    const foundPlayer = await this.getPlayerById(id);

    await this.playersRepo.remove(foundPlayer);
  }
}
