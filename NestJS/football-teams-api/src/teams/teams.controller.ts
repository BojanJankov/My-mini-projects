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
import { TeamsService } from './teams.service';
import { CreateTeamDto } from './dtos/create-teams.dto';
import { UpdateTeamDto } from './dtos/update-teams.dto';
import { AddPlayerToTheTeamDto } from './dtos/add-player-team.dto';
import { TeamFilters } from './interfaces/filters-interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/roles.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('teams')
export class TeamsController {
  constructor(private teamsService: TeamsService) {}

  @Get()
  @Roles(RolesEnum.user, RolesEnum.admin)
  getAllTeams(
    @Query('name') name: string,
    @Query('league') league: string,
    @Query('orderBy') orderBy: 'year' | 'valueOfTeam' | 'trophies',
    @Query('maxResults') maxResults: string,
    @Query('firstResult') firstResult: string,
  ) {
    const filters: TeamFilters = {
      name,
      league,
      orderBy,
    };

    filters.maxResults = maxResults ? Number(maxResults) : 10;
    filters.firstResult = firstResult ? Number(firstResult) - 1 : 0;

    return this.teamsService.getAllTeams(filters);
  }

  @Get('/:id')
  @Roles(RolesEnum.user, RolesEnum.admin)
  getTeamById(@Param('id') id: string) {
    return this.teamsService.getTeamById(id);
  }

  @Post()
  @Roles(RolesEnum.admin)
  createTeam(@Body() createTeamData: CreateTeamDto) {
    return this.teamsService.createTeam(createTeamData);
  }

  @Get('/:id/players')
  @Roles(RolesEnum.user, RolesEnum.admin)
  listAllPlayersFromTeam(@Param('id') id: string) {
    return this.teamsService.listAllPlayersFromTeam(id);
  }

  @Post('/:id/players')
  @Roles(RolesEnum.admin)
  addPlayerToTheTeam(
    @Param('id') id: string,
    @Body() addPlayerToTheTeam: AddPlayerToTheTeamDto,
  ) {
    return this.teamsService.addPlayerToTheTeam(id, addPlayerToTheTeam);
  }

  @Patch('/:id')
  @Roles(RolesEnum.admin)
  updateTeam(@Param('id') id: string, @Body() updateTeamData: UpdateTeamDto) {
    return this.teamsService.updateTeam(id, updateTeamData);
  }

  @Delete('/:id')
  @HttpCode(204)
  @Roles(RolesEnum.admin)
  deleteTeam(@Param('id') id: string) {
    return this.teamsService.deleteTeam(id);
  }

  @Delete('/:teamId/players/:playerId')
  @HttpCode(204)
  @Roles(RolesEnum.admin)
  deletePlayerFromTeam(
    @Param('teamId') teamId: string,
    @Param('playerId') playerId: string,
  ) {
    return this.teamsService.deletePlayerFromTeam(teamId, playerId);
  }
}
