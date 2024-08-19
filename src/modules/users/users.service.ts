import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) { }

  public async create(dto: CreateUserDto): Promise<User> {
    debugger;
    console.log(dto);
    dto.password = await this.hashPassword(dto.password);
    console.log(dto.password);
    const user = new User(dto);

    const userExist = await this.userExist(dto.username)
    console.log(userExist);
    if (userExist) {
      throw new Error("O usuário já está cadastrado");
    }

    return await this.repository.create(user);
  }

  public async findAll(): Promise<Array<User>> {
    return await this.repository.findAll();
  }

  public async findOne(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }

  public async findBy(data: User): Promise<Array<User>> {
    const filters = this.criarFiltros(data);
    return await this.repository.findBy(filters);
  }

  public async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.repository.update(id, updateUserDto);
  }

  public async remove(id: number): Promise<void> {
    await this.repository.remove(id);
  }
  public async userExist(username: string): Promise<User> {
    return await this.repository.userExist(username);
  }
  public criarFiltros(data: User): any {
    const filters = {
      ...(data.name && { name: data.name }),
      ...(data.email && { email: data.email }),
      ...(data.username && { username: data.username }),
    };
    return filters;
  }

  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  public async comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }
}
