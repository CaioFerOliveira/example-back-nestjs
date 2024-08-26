import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Knex from 'knex';
import { KnexModule, KnexModuleOptions } from 'nestjs-knex';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './core/filters/exception.filter';

const databaseConfig: KnexModuleOptions = {
  config: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      host: process.env.HOST || 'localhost',
      port: parseInt(process.env.PORT) || 5442,
      user: process.env.DATABASE_USER || 'docker',
      database: process.env.DATABASE || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'docker',
      ssl: process.env.SSL === 'true' ? { rejectUnauthorized: false } : false,
    },
    pool: { min: 2, max: 10 },
    acquireConnectionTimeout: 60000,
    migrations: {
      tableName: 'migrations',
      extension: 'ts',
    },
    seeds: {
      directory: './seeds',
    },
  }
}
const knexT = Knex(databaseConfig.config);

async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({}));

  const httpAdapter = app.get(HttpAdapterHost);
  const configService = app.get(ConfigService);
  console.log(configService.get<any>('db'));

  const runMigration = (): void => {
    knexT.migrate.latest()
      .then(() => { })
      .then(() => { console.log(`${String.fromCodePoint(9989)} [Migration]: migration already executed`) })
      .catch((error) => {
        console.log(`${String.fromCodePoint(0x1f525)} [ERRO]: migration not executed`);
        console.log(`${String.fromCodePoint(0x1f631)} ${error}`);
      });
  }
  const knexModule = app.get(KnexModule);
  runMigration();
  console.log(knexModule);
  app.useGlobalFilters(new AllExceptionFilter(httpAdapter));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Example NestJs API')
    .setDescription('An API ')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
