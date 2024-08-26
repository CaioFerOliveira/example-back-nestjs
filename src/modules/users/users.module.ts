import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AuthService],
  exports: [UsersService, UsersRepository]
})
export class UsersModule { }
