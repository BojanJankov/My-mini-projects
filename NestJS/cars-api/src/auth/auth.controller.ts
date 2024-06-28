import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { CredentialsDto } from './dtos/credentials.dto';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() userData: CreateUserDto) {
    return this.authService.registerUser(userData);
  }

  @Post('login')
  async loginUser(
    @Body() loginUserData: CredentialsDto,
    @Res() response: Response,
  ) {
    const { accessToken, refreshToken, user } =
      await this.authService.loginUser(loginUserData);

    response.set('access-token', accessToken);
    response.set('refresh-token', refreshToken);
    response.setHeader('Access-Control-Expose-Headers', '*');

    return response.json(user);
  }
}
