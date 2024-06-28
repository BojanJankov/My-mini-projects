import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Album } from './entities/album.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AlbumsService {
  constructor(@InjectRepository(Album) private albumsRepo: Repository<Album>) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = this.albumsRepo.create({
      ...createAlbumDto,
      artist: { id: createAlbumDto.artistId },
      songs: createAlbumDto.songs.map((id) => ({ id })),
    });

    await this.albumsRepo.save(newAlbum);

    return newAlbum;
  }

  findAll() {
    return this.albumsRepo.find({});
  }

  findOne(id: number) {
    const foundAlbum = this.albumsRepo.findOne({
      where: { id },
      relations: {
        artist: true,
        songs: true,
      },
    });

    if (!foundAlbum) throw new NotFoundException('Album Not Found');

    return foundAlbum;
  }

  async update(id: number, updateAlbumDto: UpdateAlbumDto) {
    const foundAlbum = await this.findOne(id);

    Object.assign(foundAlbum, updateAlbumDto);

    await this.albumsRepo.save(foundAlbum);
  }

  async remove(id: number) {
    const foundAlbum = await this.findOne(id);

    await this.albumsRepo.remove(foundAlbum);
  }
}
