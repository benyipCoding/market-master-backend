import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(user_id: string) {
    return this.prismaService.profile.create({
      data: {
        user_id,
        fav_sym_ids: [],
      },
    });
  }

  async addSymbolToFavourite(user: User, symbol_id: number) {
    return `User: ${user.display_name}. Symbol: ${symbol_id}`;
  }
}
