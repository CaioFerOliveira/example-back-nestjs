import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { PrismaService } from './modules/database/prisma-service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, }), UsersModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    PrismaService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class AppModule { }
