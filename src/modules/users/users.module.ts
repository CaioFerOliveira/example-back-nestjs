import { Module } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { userProviders } from './providers/user.providers';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, AuthService, ...userProviders],
  exports: [UsersService, UsersRepository]
})
export class UsersModule { }
