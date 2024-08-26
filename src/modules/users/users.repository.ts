import { Injectable } from '@nestjs/common';
import { InjectConnection, Knex } from 'nestjs-knex';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {

    constructor(
        @InjectConnection() private readonly knex: Knex
    ) { }

    public async create(data: User): Promise<User> {
        return await this.knex.select().table('users').insert({ username: data.username, password: data.password, name: data.name, email: data.email });
    }

    public async findAll(): Promise<Array<User>> {
        return await this.knex.select().table('users');
    }

    public async findOne(id: string): Promise<User> {
        return await this.knex.select().table('users').where({ id: id }).select().first();
    }

    public async findBy(filters: User): Promise<void> {
        // return await this.prismaService.user.findMany({
        //     where: filters
        // });
    }

    public async userExist(username: string): Promise<User> {
        const user = await this.knex.select().table('users').where({ username: username }).first();
        return user;
    }

    public async update(id: string, dto: User): Promise<void> {
        // return await this.prismaService.user.update({
        //     data: dto,
        //     where: {
        //         id,
        //     },
        // })
    }

    public async remove(id: string): Promise<void> {
        await this.knex.select().table('users').where({ id: id }).delete();
    }
}