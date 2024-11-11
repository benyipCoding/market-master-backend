import { Controller, Param, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProfileService } from './profile.service';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from '@prisma/client';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Put('/update-fav/:id')
  addSymbolToFavourite(
    @CurrentUser() user: User,
    @Param('id') symbol_id: number,
  ) {
    return this.profileService.addSymbolToFavourite(user, symbol_id);
  }
}
