import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/users/dtos/create-user.dto';
import { CreateCredentialsDto } from './dtos/credentials-dto';
import { Response, response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() createUserData: CreateUserDto) {
    return this.authService.registerUser(createUserData);
  }

  @Post('login')
  async loginUser(
    @Body() credentials: CreateCredentialsDto,
    @Res() res: Response,
  ) {
    const { user, accessToken, refreshToken } =
      await this.authService.loginUser(credentials);

    res.set('access-token', accessToken);
    res.set('refresh-token', refreshToken);

    return res.json(user);
  }
}
