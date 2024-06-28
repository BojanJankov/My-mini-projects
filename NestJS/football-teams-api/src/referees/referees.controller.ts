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
import { RefereesService } from './referees.service';
import { CreateRefereeDto } from './dtos/create-referee.dto';
import { UpdateRefereeDto } from './dtos/update-referee.dto';
import { AddMatchToRefereeDto } from './dtos/add-matches-referee.dto';
import { RefereeFilters } from './interfaces/filters-interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/roles.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('referees')
export class RefereesController {
  constructor(private refereesService: RefereesService) {}

  @Get()
  @Roles(RolesEnum.user, RolesEnum.admin)
  getAllReferees(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('orderBy') orderBy: 'age' | 'salary' | 'yearsOfExperience',
    @Query('maxResults') maxResults: string,
    @Query('firstResult') firstResult: string,
  ) {
    const filters: RefereeFilters = {
      firstName,
      lastName,
      orderBy,
    };

    filters.maxResults = maxResults ? Number(maxResults) : 10;
    filters.firstResult = firstResult ? Number(firstResult) - 1 : 0;

    return this.refereesService.getAllReferees(filters);
  }

  @Get('/:id')
  @Roles(RolesEnum.user, RolesEnum.admin)
  getRefereeById(@Param('id') id: string) {
    return this.refereesService.getRefereeById(id);
  }

  @Post()
  @Roles(RolesEnum.admin)
  createReferee(@Body() createRefereeData: CreateRefereeDto) {
    return this.refereesService.createReferee(createRefereeData);
  }

  @Get('/:id/matches')
  @Roles(RolesEnum.user, RolesEnum.admin)
  listAllMatchesFromReferee(@Param('id') id: string) {
    return this.refereesService.listAllMatchesFromReferee(id);
  }

  @Post('/:id/matches')
  @Roles(RolesEnum.admin)
  addMatchToReferee(
    @Param('id') id: string,
    @Body() addMatchToRefereeData: AddMatchToRefereeDto,
  ) {
    return this.addMatchToReferee(id, addMatchToRefereeData);
  }

  @Patch('/:id')
  @Roles(RolesEnum.admin)
  updateReferee(
    @Param('id') id: string,
    @Body() updateRefereeData: UpdateRefereeDto,
  ) {
    return this.refereesService.updateReferee(id, updateRefereeData);
  }

  @Delete('/:id')
  @Roles(RolesEnum.admin)
  deleteReferee(@Param('id') id: string) {
    return this.refereesService.deleteReferee(id);
  }

  @Delete('/:refereeId/matches/:matchId')
  @HttpCode(204)
  @Roles(RolesEnum.admin)
  deleteMatchFromReferee(
    @Param('refereeId') refereeId: string,
    @Param('matchId') matchId: string,
  ) {
    return this.refereesService.deleteMatchFromReferee(refereeId, matchId);
  }
}
