import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) { }

  public async create(dto: UserDto, userLogged: any): Promise<User> {
    const userExist = await this.userExist(dto.username)

    if (userExist) {
      throw new BadRequestException("O usuário já está cadastrado");
    }

    const user = new User(dto);
    if (userLogged) {
      user.createdBy = userLogged.userId;
    }
    user.password = await this.hashPassword(dto.password);
    return await this.repository.create(user);
  }

  public async findAll(): Promise<Array<User>> {
    return await this.repository.findAll();
  }

  public async findOne(id: string): Promise<User> {
    return await this.repository.findOne(id);
  }

  public async findBy(data: User): Promise<Array<User>> {
    const filters = this.createFilters(data);
    return await this.repository.findBy(filters);
  }

  public async update(id: string, dto: UserDto): Promise<User> {
    return await this.repository.update(id, new User(dto));
  }

  public async remove(id: string): Promise<void> {
    await this.repository.remove(id);
  }

  public async userExist(username: string): Promise<User> {
    return await this.repository.userExist(username);
  }

  public createFilters(data: User): any {
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
