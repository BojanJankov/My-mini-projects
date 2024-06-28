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
import { MatchesService } from './matches.service';
import { CreateMatchDto } from './dtos/create-match.dto';
import { UpdateMatchDto } from './dtos/update-match.dto';
import { MatchFilters } from './interfaces/filters-interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/roles.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('matches')
export class MatchesController {
  constructor(private matchesService: MatchesService) {}

  @Get()
  @Roles(RolesEnum.user, RolesEnum.admin)
  getAllMatches(
    @Query('league') league: string,
    @Query('result') result: string,
    @Query('maxResults') maxResults: string,
    @Query('firstResult') firstResult: string,
  ) {
    const filters: MatchFilters = {
      league,
      result,
    };

    filters.maxResults = maxResults ? Number(maxResults) : 10;
    filters.firstResult = firstResult ? Number(firstResult) - 1 : 0;

    return this.matchesService.getAllMatches(filters);
  }

  @Get('/:id')
  @Roles(RolesEnum.user, RolesEnum.admin)
  getMatchById(@Param('id') id: string) {
    return this.matchesService.getMatchById(id);
  }

  @Post()
  @Roles(RolesEnum.admin)
  createMatch(@Body() createMatchData: CreateMatchDto) {
    return this.matchesService.createMatch(createMatchData);
  }

  @Patch('/:id')
  @Roles(RolesEnum.admin)
  updateMatch(@Param('id') id: string, updateMatchData: UpdateMatchDto) {
    return this.matchesService.updateMatch(id, updateMatchData);
  }

  @Delete('/:id')
  @HttpCode(204)
  @Roles(RolesEnum.admin)
  deleteMatch(@Param('id') id: string) {
    return this.matchesService.deleteMatch(id);
  }
}
