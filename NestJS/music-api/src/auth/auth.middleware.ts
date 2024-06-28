import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { NextFunction, Request, Response } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const refreshToken = req.headers['refresh-token'];

    if (refreshToken) {
      try {
        const { id } = await this.jwtService.verifyAsync(
          refreshToken as string,
          {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
          },
        );
        const foundUser = await this.usersService.getUserById(id);

        const tokenExists = foundUser.refreshTokens.some(
          (token) => token === refreshToken,
        );

        if (!tokenExists) throw new Error();

        const newAccessToken = await this.jwtService.signAsync({
          id: foundUser.id,
        });

        const newRefreshToken = await this.jwtService.signAsync(
          { id: foundUser.id },
          {
            secret: this.configService.get('REFRESH_TOKEN_SECRET'),
            expiresIn: '7d',
          },
        );

        await this.usersService.deleteRefreshToken(
          foundUser.id,
          refreshToken as string,
        );

        await this.usersService.saveRefreshToken(foundUser.id, newRefreshToken);

        res.set('access-token', newAccessToken);
        res.set('refresh-token', newRefreshToken);
      } catch (error) {
        console.error(error);
      }
    }
    next();
  }
}
