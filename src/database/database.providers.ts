import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';

export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async (configService: ConfigService) => {
            const sequelize = new Sequelize(
                configService.get<string>('db.url'),
                {
                    host: configService.get<string>('db.host'),
                    database: configService.get<string>('db.database'),
                    username: configService.get<string>('db.username'),
                    password: configService.get<string>('db.password'),
                    dialect: configService.get<string>('db.dialect') as Dialect,
                }
            );
            sequelize.addModels([User]);
            return sequelize;
        },
        inject: [ConfigService],
    },
];