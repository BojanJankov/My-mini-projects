import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dtos/create-maneger.dto';
import { UpdateManagerDto } from './dtos/update-maneger.dto';
import { ManagerFilters } from './interfaces/filters-interface';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { RolesEnum } from 'src/auth/roles.enum';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@Controller('managers')
export class ManagersController {
  constructor(private managersService: ManagersService) {}

  @Get()
  @Roles(RolesEnum.user, RolesEnum.admin)
  getAllManagers(
    @Query('firstName') firstName: string,
    @Query('lastName') lastName: string,
    @Query('orderBy') orderBy: 'age' | 'salary' | 'yearsOfExperience',
    @Query('maxResults') maxResults: string,
    @Query('firstResult') firstResult: string,
  ) {
    const filters: ManagerFilters = {
      firstName,
      lastName,
      orderBy,
    };
    filters.maxResults = maxResults ? Number(maxResults) : 10;
    filters.firstResult = firstResult ? Number(firstResult) - 1 : 0;
    return this.managersService.getAllManagers(filters);
  }

  @Get('/:id')
  @Roles(RolesEnum.user, RolesEnum.admin)
  getManagerById(@Param('id') id: string) {
    return this.managersService.getManagerById(id);
  }

  @Post()
  @Roles(RolesEnum.admin)
  createManager(@Body() createManagerData: CreateManagerDto) {
    return this.managersService.createManager(createManagerData);
  }

  @Patch('/:id')
  @Roles(RolesEnum.admin)
  updateManager(
    @Param('id') id: string,
    @Body() updateManagerData: UpdateManagerDto,
  ) {
    return this.managersService.updateManager(id, updateManagerData);
  }

  @Delete('/:id')
  @Roles(RolesEnum.admin)
  deleteManager(@Param('id') id: string) {
    return this.managersService.deleteManager(id);
  }
}
