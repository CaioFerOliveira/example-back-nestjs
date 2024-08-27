import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { BusinessException } from 'src/core/exceptions/business-exception';
import { UserResponseDto } from './dto/user-dto-response';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository) { }

  public async create(dto: UserDto): Promise<User> {
    const userExist = await this.userExist(dto.username)
    if (userExist) {
      throw new BusinessException("O usuário já está cadastrado");
    }
    const user = new User(dto);
    user.password = await this.hashPassword(dto.password);
    return await this.repository.create(user);
  }

  public async findById(id: string): Promise<UserResponseDto> {
    console.log(id)
    if (!id) {
      throw new BusinessException("O id informado é inválido");
    }
    const user = await this.findOne(id);
    return new UserResponseDto(user);
  }

  public async findAll(): Promise<Array<UserResponseDto>> {
    let dtos: Array<UserResponseDto> = [];
    let users = await this.repository.findAll();
    users.map((user: User) => {
      dtos.push(new UserResponseDto(user));
    })
    return dtos;
  }

  public async findOne(id: string): Promise<User> {
    let user = await this.repository.findOne(id);
    return user;
  }

  public async findBy(data: User): Promise<Array<User>> {
    const filters = this.createFilters(data);
    await this.repository.findBy(filters);
    return;
  }

  public async update(id: string, dto: UserDto, req: any): Promise<User> {
    let user = await this.findOne(id);

    const userLogged = req.user;
    Object.assign(user, dto);
    user.updatedBy = userLogged;
    user.updatedAt = new Date();

    await this.repository.update(id, user);
    return;
  }

  public async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new BusinessException("Usuário não encontrado")
    }
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
