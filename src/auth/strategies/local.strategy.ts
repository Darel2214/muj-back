import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../services/auth/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'dni',
      passwordField: 'password',
    });
  }

  async validate(dni: string, password: string) {
    const user = await this.authService.validateUser(dni, password);

    if (!user) {
      throw new UnauthorizedException('Not allow');
    }

    return user;
  }
}
