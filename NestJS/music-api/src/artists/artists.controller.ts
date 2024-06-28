import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RolesEnum } from 'src/auth/roles.enum';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';

@UseGuards(AuthGuard, RolesGuard)
@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  @Roles(RolesEnum.admin)
  createArtist(@Body() createArtistData: CreateArtistDto) {
    return this.artistsService.createArtist(createArtistData);
  }

  @Get()
  @Roles(RolesEnum.user, RolesEnum.admin)
  getAllArtist() {
    return this.artistsService.getAllArtists();
  }

  @Get(':id')
  @Roles(RolesEnum.user, RolesEnum.admin)
  getArtistById(@Param('id') id: string) {
    return this.artistsService.getArtistById(Number(id));
  }

  @Patch(':id')
  @Roles(RolesEnum.admin)
  updateArtist(
    @Param('id') id: string,
    @Body() updateArtistData: UpdateArtistDto,
  ) {
    return this.artistsService.updateArtist(Number(id), updateArtistData);
  }

  @Delete(':id')
  @HttpCode(204)
  @Roles(RolesEnum.admin)
  deleteArtist(@Param('id') id: string) {
    return this.artistsService.deleteArtist(Number(id));
  }
}
