import { Controller, Get, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(
    private readonly profileService: ProfileService,
    private readonly prismaService: PrismaService,
  ) {}

  @Put('/update-fav/:id')
  addSymbolToFavourite(
    @CurrentUser() user: User,
    @Param('id') symbol_id: number,
  ) {
    return this.profileService.addSymbolToFavourite(user, symbol_id);
  }

  @Get()
  getProfile(@CurrentUser() user: User) {
    return this.prismaService.profile.findUnique({
      where: { user_id: user.id },
    });
  }

  @Get('/favSymbols')
  getFavSymbols(@CurrentUser() user: User) {
    return this.prismaService.profile.findUnique({
      where: { user_id: user.id },
      select: { fav_sym_ids: true },
    });
  }
}
