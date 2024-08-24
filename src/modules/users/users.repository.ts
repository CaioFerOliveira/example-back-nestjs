import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma-service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {

    constructor(private prismaService: PrismaService) { }

    public async create(data: User): Promise<User> {
        return await this.prismaService.user.create({ data });
    }

    public async findAll(): Promise<User[]> {
        return await this.prismaService.user.findMany();
    }

    public async findOne(id: string): Promise<User> {
        return await this.prismaService.user.findUnique({
            where: {
                id
            }
        });
    }

    public async findBy(filters: User): Promise<Array<User>> {
        return await this.prismaService.user.findMany({
            where: filters
        });
    }

    public async userExist(username: string): Promise<User> {
        return await this.prismaService.user.findFirst({
            where: {
                username
            }
        });
    }

    public async update(id: string, dto: User): Promise<User> {
        return await this.prismaService.user.update({
            data: dto,
            where: {
                id,
            },
        })
    }

    public async remove(id: string): Promise<void> {
        await this.prismaService.user.delete({
            where: {
                id
            }
        })
    }
}