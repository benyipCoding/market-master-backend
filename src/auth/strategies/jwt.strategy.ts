import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { TokenPayload } from '../token-payload.interface';
import { UsersService } from 'src/users/users.service';
import { RegularUserSelectField } from 'src/prisma/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    const options: StrategyOptions = {
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => request.cookies.Authentication,
      ]),
      secretOrKey: configService.getOrThrow('JWT_SECRET'),
    };
    super(options);
  }

  async validate(payload: TokenPayload) {
    const user = await this.usersService.getUser(
      { id: payload.userId },
      RegularUserSelectField,
    );
    return user;
  }
}
