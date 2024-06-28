import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const authHeaderTokenValue = request.headers?.authorization?.split(' ')[1];

    const userInToken = this.jwtService.decode(authHeaderTokenValue);

    if (!userInToken) {
      return false;
    }

    const user = await this.usersService.getUserById(userInToken.id);

    return roles.includes(user['role']);
  }
}
