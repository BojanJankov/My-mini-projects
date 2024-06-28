import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Feature } from './entities/feature.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateFeatureDto } from './dtos/create-feature.dto';
import { UpdateFeatureDto } from './dtos/update-feature.dto';
import { FeatureFilters } from './interfaces/feature-filters';

@Injectable()
export class FeatureService {
  constructor(
    @InjectRepository(Feature) private featuresRepo: Repository<Feature>,
  ) {}

  async getAllFeatures(filters: FeatureFilters) {
    const filtersConfig: FindManyOptions<Feature> = {};

    filtersConfig.take = filters.maxResults;
    filtersConfig.skip = filters.firstResult;

    if (filters.name) {
      filtersConfig.where = { name: filters.name };
    }

    if (filters.description) {
      filtersConfig.where = {
        ...filtersConfig.where,
        description: filters.description,
      };
    }

    const features = await this.featuresRepo.find(filtersConfig);
    const count = await this.featuresRepo.count();

    return {
      features,
      totalRecords: count,
    };
  }

  async getFeatureById(id: string) {
    const foundFeature = await this.featuresRepo.findOneBy({ id });

    if (!foundFeature) throw new NotFoundException('Feature Not Found');

    return foundFeature;
  }

  createFeature(featureData: CreateFeatureDto) {
    return this.featuresRepo.save(featureData);
  }

  async updateFeature(id: string, featureData: UpdateFeatureDto) {
    const foundFeature = await this.getFeatureById(id);

    Object.assign(foundFeature, featureData);

    await this.featuresRepo.save(foundFeature);
  }

  async deleteFeature(id: string) {
    const foundFeature = await this.getFeatureById(id);

    await this.featuresRepo.remove(foundFeature);
  }
}
