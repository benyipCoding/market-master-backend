import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class UserAgentMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const ua = req.headers['user-agent'] || '';
    const sk = process.env.NEXT_PUBLIC_REQUEST_SK || '';
    const msg = process.env.NEXT_PUBLIC_REQUEST_MSG || '';
    const bytes = CryptoJS.AES.decrypt(ua, sk);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!ua || msg !== decrypted) {
      throw new ForbiddenException();
    }

    next();
  }
}
