import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { Team } from './entities/teams.entity';
import { CreateTeamDto } from './dtos/create-teams.dto';
import { UpdateTeamDto } from './dtos/update-teams.dto';
import { AddPlayerToTheTeamDto } from './dtos/add-player-team.dto';
import { TeamFilters } from './interfaces/filters-interface';

@Injectable()
export class TeamsService {
  constructor(@InjectRepository(Team) private teamsRepo: Repository<Team>) {}

  async getAllTeams(filters: TeamFilters) {
    const filtersConfig: FindManyOptions<Team> = {};

    filtersConfig.take = filters.maxResults;
    filtersConfig.skip = filters.firstResult;

    if (filters.name) {
      filtersConfig.where = { name: filters.name };
    }

    if (filters.league) {
      filtersConfig.where = {
        ...filtersConfig.where,
        league: filters.league,
      };
    }

    if (filters.orderBy) {
      if (filters.orderBy === 'year') filtersConfig.order = { year: 'ASC' };
      if (filters.orderBy === 'valueOfTeam')
        filtersConfig.order = { valueOfTeam: 'ASC' };
      if (filters.orderBy === 'trophies')
        filtersConfig.order = { trophies: 'ASC' };
    }

    const teams = await this.teamsRepo.find(filtersConfig);
    const count = await this.teamsRepo.count();

    return {
      teams,
      totalRecords: count,
    };
  }

  getTeamById(id: string) {
    const foundTeam = this.teamsRepo.findOne({
      where: { id },
      relations: {
        manager: true,
        players: true,
      },
    });

    if (!foundTeam) throw new NotFoundException('Team Not Found');

    return foundTeam;
  }

  async createTeam(createTeamData: CreateTeamDto) {
    const newTeam = this.teamsRepo.create({
      ...createTeamData,
      manager: { id: createTeamData.manager },
    });

    const createdTeam = await this.teamsRepo.save(newTeam);

    return createdTeam;
  }

  async listAllPlayersFromTeam(id: string) {
    const foundTeam = await this.getTeamById(id);

    return foundTeam.players;
  }

  async addPlayerToTheTeam(
    id: string,
    addPlayerToTheTeam: AddPlayerToTheTeamDto,
  ) {
    const foundTeam = await this.getTeamById(id);

    await this.teamsRepo.save({
      ...foundTeam,
      players: [...foundTeam.players, { id: addPlayerToTheTeam.player }],
    });
  }

  async updateTeam(id: string, updateTeamData: UpdateTeamDto) {
    const foundTeam = await this.getTeamById(id);

    Object.assign(foundTeam, updateTeamData);

    await this.teamsRepo.save(foundTeam);
  }

  async deleteTeam(id: string) {
    const foundTeam = await this.getTeamById(id);

    await this.teamsRepo.remove(foundTeam);
  }

  async deletePlayerFromTeam(teamId: string, playerId: string) {
    const foundTeam = await this.getTeamById(teamId);

    foundTeam.players = foundTeam.players.filter(
      (player) => playerId !== player.id,
    );

    await this.teamsRepo.save(foundTeam);
  }
}
