import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { hash, compare } from 'bcryptjs';
import { CredentialsDto } from './dtos/credentials.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registerUser(registerDataFromUser: CreateUserDto) {
    const foundUser = await this.userService.getUserByEmail(
      registerDataFromUser.email,
    );

    if (foundUser) throw new BadRequestException('Email already exists');

    const hashedPassword = await hash(registerDataFromUser.password, 8);

    registerDataFromUser.password = hashedPassword;

    await this.userService.createuser(registerDataFromUser);
  }

  async loginUser(credentials: CredentialsDto) {
    const foundUser = await this.userService.getUserByEmail(credentials.email);

    if (!foundUser) throw new UnauthorizedException('Invalid Credentials');

    const isPasswordValid = await compare(
      credentials.password,
      foundUser.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid Credentials');

    const accessToken = await this.jwtService.signAsync(
      { id: foundUser.id },
      { secret: this.configService.get('ACCESS_TOKEN_SECRET') },
    );
    const refreshToken = await this.jwtService.signAsync(
      { id: foundUser.id },
      { secret: this.configService.get('REFRESH_TOKEN_SECRET') },
    );

    console.log('Refresh token od login', refreshToken);

    await this.userService.saveRefreshToken(foundUser.id, refreshToken);

    delete foundUser.password;
    delete foundUser.refreshTokens;

    return {
      user: foundUser,
      accessToken,
      refreshToken,
    };
  }
}
