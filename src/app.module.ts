import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
import { AllExceptionFilter } from './core/filters/exception.filter';
import { AuthModule } from './modules/auth/auth.module';
import { AuthService } from './modules/auth/auth.service';
import { PrismaService } from './modules/database/prisma-service';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    JwtModule.register({
      global: true,
      secret: env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    })
    , UsersModule, AuthModule],
  controllers: [],
  providers: [
    AuthService,
    PrismaService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule { }


// @Module({
//   imports: [
//     ConfigModule.forRoot({ isGlobal: true, load: [config] }),
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (config) => ({
//         secret: config.get('jwt.secret'),
//         signOptions: config.get('jwt.expiresIn')
//       }),
//       global: true,
//       inject: [ConfigService],
//     }), UsersModule, AuthModule],
//   controllers: [],
//   providers: [
//     AuthService,
//     PrismaService,
//   ],
// })
// export class AppModule { }
