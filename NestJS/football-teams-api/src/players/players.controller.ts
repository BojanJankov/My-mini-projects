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
import { PlayersService } from './players.service';
import { CreatePlayerDto } from './dtos/create-players.dto';
import { UpdatePlayerDto } from './dtos/update-players.dto';
import { PlayerFilters } from './interfaces/filters-interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesEnum } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('players')
export class PlayersController {
  constructor(private playersService: PlayersService) {}

  @Get()
  @Roles(RolesEnum.user, RolesEnum.admin)
  getAllPlayers(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('orderBy') orderBy: 'age' | 'salary' | 'yearsOfPlayingCareer',
    @Query('maxResults') maxResults: string,
    @Query('firstResult') firstResult: string,
  ) {
    const filters: PlayerFilters = {
      firstName,
      lastName,
      orderBy,
    };

    filters.maxResults = maxResults ? Number(maxResults) : 10;
    filters.firstResult = firstResult ? Number(firstResult) - 1 : 0;

    return this.playersService.getAllPlayers(filters);
  }

  @Get('/:id')
  @Roles(RolesEnum.user, RolesEnum.admin)
  getPlayerById(@Param('id') id: string) {
    return this.playersService.getPlayerById(id);
  }

  @Post()
  @Roles(RolesEnum.admin)
  createPlayer(@Body() createPlayerData: CreatePlayerDto) {
    return this.playersService.createPlayer(createPlayerData);
  }

  @Patch('/:id')
  @Roles(RolesEnum.admin)
  updatePlayer(@Param('id') id: string, updatePlayerData: UpdatePlayerDto) {
    return this.playersService.updatePlayer(id, updatePlayerData);
  }

  @Delete('/:id')
  @HttpCode(204)
  @Roles(RolesEnum.admin)
  deletePlayer(@Param('id') id: string) {
    return this.playersService.deletePlayer(id);
  }
}
