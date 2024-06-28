import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { RolesEnum } from 'src/auth/roles.enum';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  getAllUsers() {
    return this.usersRepo.find({});
  }

  async getUserById(id: string) {
    try {
      const foundUser = await this.usersRepo.findOneByOrFail({ id });

      return foundUser;
    } catch (error) {
      throw new NotFoundException('User Not Found');
    }
  }

  getUserByEmail(email: string) {
    return this.usersRepo.findOneBy({ email });
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    const foundUser = await this.getUserById(userId);

    foundUser.refreshTokens.push(refreshToken);

    await this.usersRepo.save(foundUser);
  }

  async deleteRefreshToken(userId: string, refreshToken: string) {
    const foundUser = await this.getUserById(userId);

    foundUser.refreshTokens = foundUser.refreshTokens.filter(
      (token) => token !== refreshToken,
    );

    await this.usersRepo.save(foundUser);
  }

  createUser(createUserData: CreateUserDto) {
    const newUser = this.usersRepo.save(createUserData);

    return newUser;
  }

  async updateUserRole(userId: string, role: RolesEnum) {
    const user = await this.getUserById(userId);

    user.role = role;

    return this.usersRepo.save(user);
  }

  async deleteUser(id: string) {
    const foundUser = await this.getUserById(id);

    await this.usersRepo.remove(foundUser);
  }
}
