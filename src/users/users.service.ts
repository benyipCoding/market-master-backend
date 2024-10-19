import { CreateUserRequest } from './dto/create-user.request';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  createUser(data: CreateUserRequest) {
    console.log(data);
  }
}
