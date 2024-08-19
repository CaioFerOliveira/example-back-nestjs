import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository){}

  public async create(createUserDto: CreateUserDto): Promise<User> {
    createUserDto.password = await this.hashPassword(createUserDto.password);
    return await this.repository.create(createUserDto);
  }

  public async findAll(): Promise<User[]> {
    return await this.repository.findAll();
  }

  public async findOne(id: number): Promise<User> {
    return await this.repository.findOne(id);
  }

  public async findBy(username: string): Promise<User> {
    return await this.repository.findBy(username);
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.repository.update(id, updateUserDto);
  }

  public async remove(id: number): Promise<void> {
    await this.repository.remove(id);
  }

  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  async comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }
}
