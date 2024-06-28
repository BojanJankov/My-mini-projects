import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { AuthGuard } from 'src/auth/auth.quard';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get('/:id')
  getUserById(@Param('id') id: string) {
    return this.userService.getUserbyId(id);
  }

  @Post()
  createUser(@Body() userData: CreateUserDto) {
    return this.userService.createuser(userData);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() updateUserData: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserData);
  }

  @Delete('/:id')
  @HttpCode(204)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  // Created just for clearing database from refresh tokens when testing
  @Delete('/deleteRefreshTokens/:id')
  @HttpCode(204)
  deleteAllRefrehsTokens(@Param('id') id: string) {
    return this.userService.deleteAllRefreshTokens(id);
  }
}
