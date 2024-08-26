import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { Auditable } from "src/core/abstracts/auditable";
import { RoleEnum } from "src/core/enums/role.enum";
export class User extends Auditable {
    @ApiProperty({
        description: 'Identificador do usuário',
        type: String,
    })
    @IsString()
    id: number;

    @ApiProperty({
        description: 'Login do usuário',
        type: String,
    })
    @IsString()
    username: string;

    @ApiProperty({
        description: 'Senha do usuário',
        type: String,
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'Nome do usuário',
        type: String,
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Email do usuário',
        type: String,
    })
    @IsString()
    email: string;

    @ApiProperty({
        description: 'Array contendo as permissões que o usuário possui',
        type: String,
    })
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
