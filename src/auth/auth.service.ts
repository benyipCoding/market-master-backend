import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import ms from 'ms';
import { ConfigService } from '@nestjs/config';
import { TokenPayload } from './token-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { randomUUID } from 'crypto';

const AuthKey = 'Authentication';
const RefreshKey = 'RefreshToken';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}
  async verifyUser(email: string, password: string) {
    try {
      const user = await this.usersService.getUser({
        email,
      });
      const authenticated = await bcrypt.compare(password, user.password);
      if (!authenticated) throw new UnauthorizedException();
      return user;
    } catch (err) {
      throw new UnauthorizedException('Credentials are not valid.');
    }
  }

  async login(user: User, response: Response) {
    const expires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        ms(this.configService.getOrThrow<string>('JWT_ACCESS_EXPIRATION')),
    );

    const tokenPayload: TokenPayload = {
      sub: user.id,
    };
    // Access token
    const accessToken = this.createAccessToken(tokenPayload);
    response.cookie(AuthKey, accessToken, {
      secure: true,
      httpOnly: true,
      expires,
    });

    // Refresh token
    tokenPayload.jti = randomUUID();
    const refreshToken = this.createRefreshToken(tokenPayload);
    const refreshExpires = new Date();
    expires.setMilliseconds(
      expires.getMilliseconds() +
        ms(this.configService.getOrThrow<string>('JWT_REFRESH_EXPIRATION')),
    );
    response.cookie(RefreshKey, refreshToken, {
      secure: true,
      httpOnly: true,
      expires: refreshExpires,
    });

    return { accessToken, refreshToken };
  }

  private createAccessToken(tokenPayload: TokenPayload): string {
    return this.jwtService.sign(tokenPayload);
  }

  private createRefreshToken(tokenPayload: TokenPayload): string {
    return this.jwtService.sign(tokenPayload, {
      expiresIn: this.configService.getOrThrow<string>(
        'JWT_REFRESH_EXPIRATION',
      ),
    });
  }

  async tokenRefresh(request: Request, response: Response) {
    const refreshToken = request.headers.refreshtoken;
    if (!refreshToken) {
      throw new BadRequestException(
        'The refreshToken field in the request header is undefined',
      );
    }
    try {
      const { sub, exp } = this.jwtService.verify(refreshToken as string);

      const isExpired = exp * 1000 - Date.now() < 0;
      if (isExpired)
        throw new UnauthorizedException('Refresh token has expired');

      // Check if refreshToken is blacklisted (optional)
      // Implement logic to check if the jti (JWT ID) is present in a blacklist
      // If blacklisted, throw an UnauthorizedException

      // Fetch the user based on userId (sub) from the database
      const user = await this.usersService.getUser({
        id: sub,
      });

      // Generate a new accessToken
      const newTokenPayload: TokenPayload = { sub: user.id };
      const newAccessToken = this.createAccessToken(newTokenPayload);

      const expires = new Date();
      expires.setMilliseconds(
        expires.getMilliseconds() +
          ms(this.configService.getOrThrow<string>('JWT_ACCESS_EXPIRATION')),
      );

      // Return the new accessToken
      response.cookie(AuthKey, newAccessToken, {
        secure: true,
        httpOnly: true,
        expires,
      });

      return { accessToken: newAccessToken };
    } catch (error) {
      // Handle other errors during verification (e.g., invalid token format)
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
