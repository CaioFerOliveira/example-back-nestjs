import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersRepository {
    public async create(createUserDto: CreateUserDto): Promise<User> {
        return new User();
    }

    public async findAll():  Promise<User[]> {
        return [];
    }

    public async findOne(id: number):  Promise<User> {
        return new User();
    }

    public async findBy(username: string):  Promise<User> {
        return new User();
    }

    public async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        return new User();
    }

    public async remove(id: number): Promise<void> {
    }
}