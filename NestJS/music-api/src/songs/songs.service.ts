import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dtos/create-song.dto';
import { UpdateSongDto } from './dtos/update-song.dto';

@Injectable()
export class SongsService {
  constructor(@InjectRepository(Song) private songsRepo: Repository<Song>) {}

  getAllSongs() {
    return this.songsRepo.find({ loadRelationIds: true });
  }

  async getSongById(id: number) {
    try {
      const foundSong = await this.songsRepo.findOne({
        where: { id },
        relations: {
          artist: true,
        },
      });

      if (!foundSong) throw new Error();

      return foundSong;
    } catch (error) {
      throw new NotFoundException('Song Not Found');
    }
  }

  async createSong(createSongData: CreateSongDto) {
    const newSong = this.songsRepo.create({
      ...createSongData,
      artist: { id: createSongData.artistId },
    });

    await this.songsRepo.save(newSong);

    return newSong;
  }

  async updateSong(id: number, updateSongData: UpdateSongDto) {
    const foundSong = await this.getSongById(id);

    Object.assign(foundSong, updateSongData);

    await this.songsRepo.save(foundSong);
  }

  async deleteSong(id: number) {
    const foundSong = await this.getSongById(id);

    await this.songsRepo.remove(foundSong);
  }
}
