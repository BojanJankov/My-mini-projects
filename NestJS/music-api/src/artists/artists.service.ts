import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Artist } from './entities/artist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ArtistsService {
  constructor(
    @InjectRepository(Artist) private artistsRepo: Repository<Artist>,
  ) {}
  createArtist(createArtistData: CreateArtistDto) {
    return this.artistsRepo.save(createArtistData);
  }

  getAllArtists() {
    return this.artistsRepo.find({ loadRelationIds: true });
  }

  async getArtistById(id: number) {
    try {
      const foundArtist = await this.artistsRepo.findOne({
        where: { id },
        relations: {
          songs: true,
        },
      });

      return foundArtist;
    } catch (error) {
      throw new NotFoundException('Artist Not Found');
    }
  }

  async updateArtist(id: number, updateArtistData: UpdateArtistDto) {
    const foundArtist = await this.getArtistById(id);

    Object.assign(foundArtist, updateArtistData);

    await this.artistsRepo.save(foundArtist);
  }

  async deleteArtist(id: number) {
    const foundArtist = await this.getArtistById(id);

    await this.artistsRepo.remove(foundArtist);
  }
}
