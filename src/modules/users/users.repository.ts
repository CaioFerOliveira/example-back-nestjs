import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersRepository {

    constructor(
        @Inject('USER_REPOSITORY')
        private sequelizeUser: typeof User,
    ) { }

    public async create(data: User): Promise<User> {
        return await this.sequelizeUser.create<User>(data);
    }

    public async findAll(): Promise<Array<User>> {
        return await this.sequelizeUser.findAll<User>();
    }

    public async findOne(id: number): Promise<User> {
        const teste = await this.sequelizeUser.findByPk<User>(id)
        return teste;
    }

    public async userExist(username: string): Promise<User> {
        const user = await this.sequelizeUser.findOne<User>({ where: { username } });
        return user;
    }

    public async update(id: number, dto: User): Promise<[User[], number]> {
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