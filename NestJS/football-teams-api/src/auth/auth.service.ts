import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { UsersService } from 'src/users/users.service';
import { CreateCredentialsDto } from './dtos/credentials-dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async registerUser(createUserData: CreateUserDto) {
    const userExists = await this.usersService.getUserByEmail(
      createUserData.email,
    );

    if (userExists) throw new BadRequestException('Email already exists');

    const hashedPassword = await hash(createUserData.password, 8);

    createUserData.password = hashedPassword;

    await this.usersService.createUser(createUserData);
  }

  async loginUser(credentials: CreateCredentialsDto) {
    const foundUser = await this.usersService.getUserByEmail(credentials.email);

    if (!foundUser) throw new UnauthorizedException('Invalid Credentials');

    const isPasswordValid = await compare(
      credentials.password,
      foundUser.password,
    );

    if (!isPasswordValid)
      throw new UnauthorizedException('Invalid Credentials');

    const accessToken = await this.jwtService.signAsync({ id: foundUser.id });

    const refreshToken = await this.jwtService.signAsync(
      { id: foundUser.id },
      {
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
        expiresIn: '7d',
      },
    );

    await this.usersService.saveRefreshToken(foundUser.id, refreshToken);

    delete foundUser.refreshTokens;
    delete foundUser.password;

    return {
      user: foundUser,
      accessToken,
      refreshToken,
    };
  }
}
