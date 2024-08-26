import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtSignOptions } from "@nestjs/jwt";
import { KnexModule } from "nestjs-knex";
import config from "./config/config";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthService } from "./modules/auth/auth.service";
import { UsersModule } from "./modules/users/users.module";


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configservice: ConfigService) => ({
        config: configservice.get<any>('db'),
      })
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: configService.get<JwtSignOptions>('jwt.signOptions'),
      }),
      global: true,
    }), UsersModule, AuthModule],
  controllers: [],
  providers: [
    AuthService,
  ],
})
export class AppModule { }
