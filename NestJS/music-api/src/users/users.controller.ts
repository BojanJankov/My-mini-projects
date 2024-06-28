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
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { RolesEnum } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @Roles(RolesEnum.admin)
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/:id')
  @Roles(RolesEnum.admin)
  getUserById(@Param('id') id: string) {
    return this.usersService.getUserById(id);
  }

  @Post()
  @Roles(RolesEnum.admin)
  createUser(@Body() createUserData: CreateUserDto) {
    return this.usersService.createUser(createUserData);
  }

  @Patch(':id/role/:role')
  @HttpCode(204)
  @Roles(RolesEnum.admin)
  updateUserRole(@Param('id') id: string, @Param('role') role: RolesEnum) {
    return this.usersService.updateUserRole(id, role);
  }

  @Delete('/:id')
  @Roles(RolesEnum.admin)
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }
}
