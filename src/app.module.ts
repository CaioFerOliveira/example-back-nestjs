import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule, JwtSignOptions } from "@nestjs/jwt";
import config from "config/config";
import { KnexModule } from "nestjs-knex";
import { AuthModule } from "./modules/auth/auth.module";
import { AuthService } from "./modules/auth/auth.service";
import { UsersModule } from "./modules/users/users.module";
import { DatabaseModule } from './database/database.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configservice: ConfigService) => ({
        config: {
          client: configservice.get<string>('db.client'),
          connection: {
            connectionString: configservice.get<string>('db.url')
          },
          migrations: {
            directory: '../knex/migrations',
          }
        }
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
    }), UsersModule, AuthModule, DatabaseModule],
  controllers: [],
  providers: [
    AuthService,
  ],
})
export class AppModule {
}
