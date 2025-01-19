import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserRequest } from './dto/create-user.request';
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import * as bcrypt from 'bcryptjs';
import { RegularUserSelectField, SelectType } from 'src/prisma/interfaces';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly profileService: ProfileService,
  ) {}
  async createUser(data: CreateUserRequest): Promise<Partial<User>> {
    try {
      const user = await this.prismaService.user.create({
        data: {
          ...data,
          password: await bcrypt.hash(data.password, 10),
          display_name: data.first_name + ' ' + data.last_name,
          username: data.email,
        },
        select: RegularUserSelectField,
      });

      await this.profileService.create(user.id);

      return user;
    } catch (err) {
      // P2002是prisma内部的唯一性约束冲突代号
      if (err.code === 'P2002') {
        throw new UnprocessableEntityException(
          `${err.meta.target[0]} already exists.`,
        );
      }
      throw err;
    }
  }

  async getUser(filter: Prisma.UserWhereUniqueInput, select?: SelectType) {
    return this.prismaService.user.findUniqueOrThrow({
      where: filter,
      select,
    });
  }
}
