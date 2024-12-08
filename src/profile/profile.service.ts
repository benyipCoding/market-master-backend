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
    try {
      // 查询当前用户的profile的收藏symbols里有没有目标symbol
      const profile = await this.prismaService.profile.findUnique({
        where: {
          user_id: user.id,
        },
      });
      const isExisted = profile.fav_sym_ids.some(
        (symId) => symId === symbol_id,
      );

      if (isExisted)
        await this.prismaService.profile.update({
          where: { id: profile.id },
          data: {
            fav_sym_ids: profile.fav_sym_ids.filter((id) => id !== symbol_id),
          },
        });
      else
        await this.prismaService.profile.update({
          where: { id: profile.id },
          data: {
            fav_sym_ids: [...profile.fav_sym_ids, symbol_id],
          },
        });

      return `Success`;
    } catch (error) {
      throw new Error('Internal Error in addSymbolToFavourite function');
    }
  }
}
