import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { env } from 'process';
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
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // }
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
//       signOptions: { expiresIn: '1h' },
//     }), UsersModule, AuthModule],
//   controllers: [AppController],
//   providers: [
//     AppService,
//     AuthService,
//     PrismaService,
//     {
//       provide: APP_GUARD,
//       useClass: AuthGuard,
//     }
//   ],
// })
// export class AppModule { }
