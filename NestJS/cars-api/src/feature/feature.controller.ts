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
import { FeatureService } from './feature.service';
import { CreateFeatureDto } from './dtos/create-feature.dto';
import { AuthGuard } from 'src/auth/auth.quard';
import { UpdateFeatureDto } from './dtos/update-feature.dto';
import { FeatureFilters } from './interfaces/feature-filters';

@UseGuards(AuthGuard)
@Controller('feature')
export class FeatureController {
  constructor(private featureService: FeatureService) {}

  @Get()
  getAllFeatures(
    @Query('name') name: string,
    @Query('description') description: string,
    @Query('maxResults') maxResults: string,
    @Query('firstResult') firstResult: string,
  ) {
    const filters: FeatureFilters = {
      name,
      description,
    };

    filters.maxResults = maxResults ? Number(maxResults) : 10;
    filters.firstResult = firstResult ? Number(firstResult) - 1 : 0;

    return this.featureService.getAllFeatures(filters);
  }

  @Get('/:id')
  getFeatureById(@Param('id') id: string) {
    return this.featureService.getFeatureById(id);
  }

  @Post()
  createFeature(@Body() featureData: CreateFeatureDto) {
    return this.featureService.createFeature(featureData);
  }

  @Patch('/:id')
  updateFeature(
    @Param('id') id: string,
    @Body() updateFeatureData: UpdateFeatureDto,
  ) {
    return this.featureService.updateFeature(id, updateFeatureData);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteFeature(@Param('id') id: string) {
    return this.featureService.deleteFeature(id);
  }
}
