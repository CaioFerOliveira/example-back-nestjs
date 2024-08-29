import { IsArray, IsString, Matches, MinLength } from "class-validator";
import { Column, DataType, Model, Table } from "sequelize-typescript";
import { RoleEnum } from "src/core/enums/role.enum";
@Table({
    version: true,
    tableName: 'users'
})
export class User extends Model<User> {

    @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER }
    )
    id: number;

    @IsString()
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    username: string;

    @IsString()
    @MinLength(8, { message: 'O password deve possuir pelo menos 8 caracteres' })
    @Matches(/^(?=.*[0-9])/, {
        message: 'O password deve conter pelo menos um caractere numérico',
    })
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    password: string;

    @IsString()
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @IsString()
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    email: string;

    @IsArray()
    roles?: Array<RoleEnum>

    constructor(data: Partial<User> = null) {
        super();
        if (data) {
            Object.assign(this, {
                id: data.id,
                username: data.username,
                password: data.password,
                name: data.name,
                email: data.email,
                roles: data.roles
            })
        }
    }
}
