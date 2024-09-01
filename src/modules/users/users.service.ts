import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Sequelize } from 'sequelize';
import { BusinessException } from 'src/core/exceptions/business-exception';
import { UserResponseDto } from './dto/user-dto-response';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private repository: UsersRepository,
    @Inject('SEQUELIZE') private readonly sequelize: Sequelize,
  ) { }

  public async create(dto: UserDto): Promise<User> {
    const transaction = await this.sequelize.transaction();

    try {

      const userExist = await this.userExist(dto.username);

      if (userExist) {
        throw new BusinessException("O usuário já está cadastrado");
      }

      const user = new User(dto);

      user.password = await this.hashPassword(dto.password);

      const userInsert = await this.repository.create(user);

      await transaction.commit();

      return userInsert;

    } catch (error) {
      await transaction.rollback();
      throw new BusinessException(error);
    }

  }

  public async findById(id: number): Promise<UserResponseDto> {
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

  public async findOne(id: number): Promise<User> {
    let user = await this.repository.findOne(id);
    return user;
  }

  public async update(id: number, dto: UserDto, req: any): Promise<[User[], number]> {
    let user = await this.findOne(id);

    return await this.repository.update(id, user);;
  }

  public async remove(id: number): Promise<void> {
    const user = await this.findOne(id);
    if (!user) {
      throw new BusinessException("Usuário não encontrado")
    }
    await this.repository.remove(id);
  }

  public async userExist(username: string): Promise<User> {
    return await this.repository.userExist(username);
  }

  public async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }

  public async comparePasswords(enteredPassword: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, hashedPassword);
  }
}
