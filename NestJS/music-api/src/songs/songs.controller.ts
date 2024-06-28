import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dtos/create-song.dto';
import { UpdateSongDto } from './dtos/update-song.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/roles.enum';

@UseGuards(AuthGuard, RolesGuard)
@Controller('songs')
export class SongsController {
  constructor(private readonly songsService: SongsService) {}

  @Get()
  @Roles(RolesEnum.user, RolesEnum.admin)
  getAllSongs() {
    return this.songsService.getAllSongs();
  }

  @Get('/:id')
  @Roles(RolesEnum.user, RolesEnum.admin)
  getSongById(@Param('id') id: string) {
    return this.songsService.getSongById(Number(id));
  }

  @Post()
  @Roles(RolesEnum.admin)
  createSong(@Body() crateSongData: CreateSongDto) {
    return this.songsService.createSong(crateSongData);
  }

  @Patch('/:id')
  @Roles(RolesEnum.admin)
  updateSong(@Param('id') id: string, @Body() updateSongData: UpdateSongDto) {
    return this.songsService.updateSong(Number(id), updateSongData);
  }

  @Delete('/:id')
  @Roles(RolesEnum.admin)
  deleteSong(@Param('id') id: string) {
    return this.songsService.deleteSong(Number(id));
  }
}
