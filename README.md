<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

# - Pré requisitos <a name="pre-requisitos"></a>

- Node 20.x.0
  (documentação do nestjs: https://docs.nestjs.com/cli/overview)
- NPM 10.x.0
- Docker desktop

## Instalando

- Abra um **SHEL** de sua escolha dentro da pasta deseja criar o projeto e execute o comando, que irá instalar o cli do nest na versão 10:

```bash
$ npm i @nestjs/cli
```

-No mesmo terminal execute o comando:

```bash
$ npx nest new <nome_do_projeto>
```

- Ao aparecer a mensagem: "_Which package manager would you ❤️ to use?_"
- Aperte enter para selecionar o **npm**, que irá criar a estrutura padrão de um projeto nestJs e instalar as dependências padrões.

### Removendo alguns arquivos desnecessários:

- Entre no diretório criado pelo comano acima e exclua os arquivos **app.controller.ts** e **app.service.ts**, remova-os também do arquivo **app.module.ts**, que estará como abaixo:

```ts
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
```

```ts
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

- É neste arquivo, junto ao **main.ts** que as configurações globais da aplicação serão configuradas.

### Adicionando o primeiro modulo ao novo projeto

- No diretório '/src' crie um pasta chamada modules, e em seguida executa o comando:

```sh
nest g resource modules/users
```

- A CLI irá criar um estrutura padrão de CRUD, com o path passado, no exemplo 'modules/users'

- Observe que após a execução do comando o arquivo **app.modules.ts** foi alterado:

```ts
import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

- O UsersModule foi adicionado automaticamente aos imports, isso possibilita que o conteúdo declarado no **UsersModule** seja disponibilizado e utilzado por outros módulos da aplicação.

- O nest não utiliza a Estrutura MVC por default, mas é recomendado fortemente a criação de uma classe repository em todos modulos por exemplo:

```ts
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor() {}

  public async create(data: User): Promise<User> {}

  public async findAll(): Promise<Array<User>> {}

  public async findOne(id: string): Promise<User> {}

  public async findBy(filters: User): Promise<void> {}

  public async update(id: string, dto: User): Promise<void> {}

  public async remove(id: string): Promise<void> {}
}
```

- Como a classe UserRepository não foi criada utilizando o CLI do nest é necessário atualizar o **user.module.ts**

```ts
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}
```

- Para que seja possível utiliza-lo na camada de serviço, é preciso injetar a dependência do UserRepository, adicionando ao construtor da classe de serviço da seguinte forma:

```ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) {}
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
```

- O documentação do nestJs disponibiliza um grando quantidade de comandos utilitários para geração de classes no padrão nest utilizando seu cli aqui o link para mais comandos:

https://docs.nestjs.com/cli/usages

## Configurando o projeto

### Criando a imagem do banco

- Na raiz do seu projeto crie um arquivo docker-compose.yml, nele copie o código abaixo

```sh
services:
  postgres:
    image: postgres
    restart: always
    environment:
      POSTGRES_DB: postgres
      POSTGRES_USER: ${POSTGRES_USER:-docker}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-docker}
    ports:
      - '5442:5432'
    volumes:
      - ./postgres-data:/var/lib/postgresql/data
```

- Em um **shell** na raiz do projeto execute o comando a seguir, que irá iniciar um conteiner com um banco de dados.

```sh
docker-compose up -d
```

- Crie uma pasta chamada core no diretório '/src' do projeto, nela ficaram as classes utilitárias e de configuração do projeto.

### Validações de classes

- Executa o comando em um shell aberto na pasta do seu projeto:

```bash
$ npm i --save class-validator class-transformer
```

- Este comando irá instalar a biblioteca que utilizaremos para validar o objetos recebidos;

- No diretório '/src/core' crie um pasta **pipes** e nesta pasta crie um arquivo chamado: **validation.pipe.ts** e copie o código a seguir:

```ts
import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
```

- Para utilizar seu pipe globalmente adicione a configuração mostrada a seguir no arquivo **main.ts** do projeto:

```ts
app.useGlobalPipes(new ValidationPipe());
```

O arquivo **main.ts** ficará da seguinte forma:

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
```

- Agora é necessário indicar ao nest que a classe pipe responável por realizar a validação dos objetos é o **ValidationPipe**, isto é feito adicionando-o no array providers da seguinte forma:

```ts
@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
```

- Exemplo de classes utilizando as anotações da lib **class-validator** que definem o typo a ser validado:

```ts
import { IsString } from 'class-validator';
export class User {
  @IsNumber()
  id: number;

  @IsString()
  username: string;

  @IsString()
  @MinLength(8, { message: 'O password deve possuir pelo menos 8 caracteres' })
  @Matches(/^(?=.*[0-9])/, {
    message: 'O password deve conter pelo menos um caractere numérico',
  })
  password: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  constructor(data: Partial<User> = null) {
    super();
    if (data) {
      Object.assign(this, {
        id: data.id,
        username: data.username,
        password: data.password,
        name: data.name,
        email: data.email,
        roles: data.roles,
      });
    }
  }
}
```

### Padronizão e filtro de Exceptions

- No diretório '/src/core' crie um pasta chamada **exceptions** e um a **bussines-exception.ts**

```ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(public message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
```

- Essa classe que extende de HttpException será lançada em todos os casos de exceção tratados durante o desenvolvimento da seguinte forma:

```ts
 throw new BussinesExceptio("Aqui sua mensagem de erro", AlgumHTTPStatus ex: HttpStatus.BAD_REQUEST);
```

- Retornando ao diretório '/src/core' crie agora uma pasta chamada **filters** e nesta pasta crie um arquivo chamado **exception.filter.ts**, e cole nele o código a seguir:

```ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { BusinessException } from '../exceptions/business-exception';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const statusCode = exception.getStatus();

    const message =
      exception instanceof BusinessException
        ? exception.message
        : 'Houve um problema com sua requisição. Caso persista contate o suporte';

    const responseBody = {
      statusCode,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, statusCode);
  }
}
```

- Da mesma forma que o pipe, para utilizar o **AllExceptionFilter** globalmente é necessário configura-lo no arquivo **main.ts**

```ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen(3000);
}
bootstrap();
```

- Adicione a classe **AllExceptionFilter** como provider no arquivo **app.module.ts**:

```ts
@Module({
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
        {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
```

### Configurando as variáveis de ambiente do projeto

- O nestJs possui uma bibliteca que auxilia na criação e manipulação das variáveis de ambiente, execute o comando abaixo em um shell para adiciona-la em seu projeto:

```sh
$ npm i --save @nestjs/config
```

- Na raiz do projeto crie um pasta chamada **config** e nesta pasta crie um arquivo chamado **config.ts**
- No arquivo **config.ts** adicione o código abaixo:

```ts
export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET || 'teste',
    signOptions: {
      expiresIn:
        process.env.JWT_TOKEN_EXPIRATION &&
        process.env.JWT_TOKEN_EXPIRATION !== '0'
          ? process.env.JWT_TOKEN_EXPIRATION
          : '1h',
    },
  },
  db: {
    dialect: process.env.DIALECT || 'postgres',
    user: process.env.DATABASE_USER || 'docker',
    password: process.env.DATABASE_PASSWORD || 'docker',
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 5442,
    database: process.env.DATABASE || 'postegres',
    url:
      process.env.DATABASE_URL ||
      'postgresql://docker:docker@localhost:5442/postgres?schema=public',
  },
});
```

- O arquivo acima verifica se há um arquivo .env e busca seus dados, caso o arquivo .env não exista, ele define valores default para as variáveis assumirem, **Ao criar novas configurações é importante criar as variáveis neste arquivo e adicionar o valor default que será utilizado localmente**

- Para utilizar essas variáveis globalmente é necessário importar o ConfigModule(Uma classe criada e configurada pela lib) no **app.module.ts** da seguinte forma:

```ts
@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [config] })],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
```

- Para acessar os dados armazenados nas variáveis é necessário injetar a dependência **ConfigService** no construtor ou em uma factoryFunction como a seguir:

```ts
constructor(private configService: ConfigService) {
  this.secret = this.configService.get<string>('jwt.secret');
 }
//OU
useFactory: (configservice: ConfigService) => ({
    secret: configService.get<string>('jwt.secret'),
    signOptions: configService.get<JwtSignOptions>('jwt.signOptions'),
})
```

### Adicionando o Sequelize ORM

- No shell adicione os seguintes comandos:

```sh
npm install sequelize
```

```sh
npm install --save sequelize sequelize-typescript pg-hstore pg
```

```sh
npm install --save-dev @types/sequelize
```

- Crie uma pasta chamada **database** no diretório '/src' e crie um arquivo chamado **database.providers.ts** e copie o código a seguir:

```ts
import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { User } from 'src/modules/users/entities/user.entity';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.get<string>('db.url'), {
        host: configService.get<string>('db.host'),
        database: configService.get<string>('db.database'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        dialect: configService.get<string>('db.dialect') as Dialect,
      });
      sequelize.addModels([User]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
```

- Utilizado o Cli do nest iremos criar um modulo para exportar o provider acima:

```sh
npx nest g mo database
```

- No módulo criado ireamos adicionar o seguinte código:

```ts
import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
```

- Para que o Sequelize funciona corretamente devemos anotar corretamente nossas classes como no exemplo a seguir, adicionando campos ao arquivo **user.entity.ts**:

```ts
import { IsArray, IsString, Matches, MinLength } from 'class-validator';
import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { RoleEnum } from 'src/core/enums/role.enum';
@Table({
  version: true,
  tableName: 'user',
})
export class User extends Model<User> {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id: number;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  username: string;

  @IsString()
  @MinLength(8, { message: 'O password deve possuir pelo menos 8 caracteres' })
  @Matches(/^(?=.*[0-9])/, {
    message: 'O password deve conter pelo menos um caractere numérico',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @IsString()
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @IsArray()
  roles?: Array<RoleEnum>;

  constructor(data: Partial<User> = null) {
    super();
    if (data) {
      Object.assign(this, {
        id: data.id,
        username: data.username,
        password: data.password,
        name: data.name,
        email: data.email,
        roles: data.roles,
      });
    }
  }
}
```

- Mais informações de como adicionar Decoratos Sequelize nas suas classes em:
  https://www.npmjs.com/package/sequelize-typescript#type-safe-usage-of-auto-generated-functions

- O locking otimista é implementado pela própria ORM adicionando a config version: true ao decorator @table()

- Para utilizar o model de user é necessário criar um provider para classe, no diretório 'src/modules/users/providers'
  o arquivo **user.providers.ts**

```ts
import { User } from '../entities/user.entity';

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];
```

- Adicione o provider definido acima ao arquivo **user.module.ts**

```ts
import { Module } from '@nestjs/common';
import { userProviders } from './providers/user.providers';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersRepository, ...userProviders],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
```

- E é necessário atualizar sua classe de repository como a seguinte:

```ts
import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private sequelizeUser: typeof User,
  ) {}

  public async create(data: User): Promise<User> {
    return await this.sequelizeUser.create<User>(data);
  }

  public async findAll(): Promise<Array<User>> {
    return await this.sequelizeUser.findAll<User>();
  }

  public async findOne(id: number): Promise<User> {
    const teste = await this.sequelizeUser.findByPk<User>(id);
    return teste;
  }

  public async userExist(username: string): Promise<User> {
    const user = await this.sequelizeUser.findOne<User>({
      where: { username },
    });
    return user;
  }

  public async update(id: string, dto: User): Promise<[User[], number]> {
    const [affectedCount, updatedUsers] = await this.sequelizeUser.update(dto, {
      where: { id },
      returning: true,
    });
    return [updatedUsers, affectedCount];
  }

  public async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    user.destroy();
  }
}
```

### Autenticação

- Para realização de autenticação/autorização é necessário adicionar a lib que cria o token jwt ao projeto executando o comando a seguir no shell

```shell
$ npm install --save @nestjs/jwt
```

- É necessário registrar algumas configurações no **app.module.ts** para que o token jwt seja gerado e validado, um exemplo é mostrado abaixo:

```ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: configService.get<JwtSignOptions>('jwt.signOptions'),
      }),
      global: true,
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
```

- A Lib contem algumas classes utilitárias como o **JwtService**, que possui um método padrão de geração de token um exemplo a seguir:

```ts
  async signIn(
    username: string,
    pass: string,
  ): Promise<{ access_token: string }> {
    const user = await this.usersService.findOne(username);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.userId, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
```

- No código acima o método **signAsync** cria um token jwt inserindo os dados passados como parâmetros ao payload do token junto com alguns dados default como a data de geração do token e a data de expiração(o tempo de expiração é definido nas variáveis de ambiente do projeto em jwt.signOptions.expiresIn)

- A autenticação é realizada através da lib **passport**, para isso é necessário instalar suas dependências:

```shell
$ npm install --save @nestjs/passport passport passport-local
$ npm install --save-dev @types/passport-local
```

- No diretório '/src/core' crie uma pasta chamada **guards** e nela crie um arquivo chamado **local.guard.ts** e cole o código seguir:

```ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
```

- O guard acima será responsável pela validação de usuário e senha passados nas requisições.

- A seguir, no diretório '/src/core' crie um pasta chamada **auth-strategies** e nela crie um arquivo chamado **local-strategy.ts** e copie o código a seguir

```ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  validate(seusParametros) {
    Seu_metodo_de_autenticação_local;
  }
}
```

- Na classe acima substitua o código, mantendo o nome da função(validate) para que o passport entenda que o método de valição utilizado no guard seja o que está definido no escopo da função validate.

- O guard necessita ser provida para ser utilizado globalmente, desta maneira, no arquivo **app.module.ts** adicione ao array de provides o código a seguir:

```ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: configService.get<JwtSignOptions>('jwt.signOptions'),
      }),
      global: true,
    })],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
        {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    LocalStrategy,
  ],
})
```

- Para utilizar o guard criado adicione o decorator **@UseGuards(AuthGuard('local'))** no endpoint ou controllers em que deseja realizar a proteção, por exemplo:

- Como validar um endpoint:

```ts
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
```

- Da forma definida acima, apenas o endpoint login é protegido pelo guard.

- Como validar um controller:

```ts
import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller()
@UseGuards(AuthGuard('local'))
export class AppController {
  @Post('auth/login')
  async login(@Request() req) {
    return req.user;
  }
}
```

- Desta outra maneira todos os endpoints definidos no controller serão protegidos pelo guard.

- Para validação de tokens de um usuário logado há a necessidade de criarmos outra estratégia de valiação também presente da lib passport

- Voltando ao diretório '/src/core/auth-strategies crie um arquivo chamado: **jwt.strategy.ts** e adicione o código a seguir:

```ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
```

- A lib do passport decodifica e válida o token jwt recebida na requisição, algumas configurações são passadas no construtor, mas é realmente importante que **o valor passado para secretOrKey seja o mesmo registrado como secret na sua configuração, já que a lib passport usa-o como umas das validações do token**

- No diretório '/src/core/guards' crie um arquivo chamado **jwt-strategy.ts** e cole o sódigo a seguir:

```ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return super.canActivate(context);
  }
}
```

- Para que o Guard acima esteja disponível globalmente para uso é necessário que ele seja adicionado ao array de providers no **app.module.ts**

```ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [config] }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('jwt.secret'),
        signOptions: configService.get<JwtSignOptions>('jwt.signOptions'),
      }),
      global: true,
  })],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
        {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
    LocalStrategy,
    JwtAuthGuard,
  ],
})
```

- A forma de utilizar o guard é a mesma exposta no item anterior (LocalGuard)
