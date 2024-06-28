import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/roles.enum';

@Controller('albums')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Post()
  @Roles(RolesEnum.admin)
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  @Roles(RolesEnum.user, RolesEnum.admin)
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @Roles(RolesEnum.user, RolesEnum.admin)
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(Number(id));
  }

  @Patch(':id')
  @Roles(RolesEnum.admin)
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumsService.update(Number(id), updateAlbumDto);
  }

  @Delete(':id')
  @Roles(RolesEnum.admin)
  remove(@Param('id') id: string) {
    return this.albumsService.remove(Number(id));
  }
}
