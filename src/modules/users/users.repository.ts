import { Injectable } from '@nestjs/common';
import knex from 'knex';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {

    constructor() { }

    public async create(data: User): Promise<void> {
        return await knex('users').insert({ data });
    }

    public async findAll(): Promise<void> {
        // return await 
    }

    public async findOne(id: string): Promise<User> {
        return await knex('user').where('id').first();
    }

    public async findBy(filters: User): Promise<void> {
        // return await this.prismaService.user.findMany({
        //     where: filters
        // });
    }

    public async userExist(username: string): Promise<void> {
        // return await this.prismaService.user.findFirst({
        //     where: {
        //         username
        //     }
        // });
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
        // await this.prismaService.user.delete({
        //     where: {
        //         id
        //     }
        // })
    }
}