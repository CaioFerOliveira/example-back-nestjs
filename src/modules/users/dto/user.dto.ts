import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsString } from "class-validator";
import { RoleEnum } from "src/core/enums/role.enum";

export class UserDto {
    @ApiProperty({
        description: 'Login do usuário',
        type: String,
    })
    @IsString()
    readonly username: string;

    @ApiProperty({
        description: 'Password do usuário',
        type: String,
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'Nome do usuário',
        type: String,
    })
    @IsString()
    readonly name: string;

    @ApiProperty({
        description: 'Email cadastral do usuário',
        type: String,
    })
    @IsString()
    readonly email: string;

    @ApiProperty({
        description: 'Array contendo as roles que o usuário possui',
        type: Array<RoleEnum>,
    })
    @IsArray()
    readonly role?: Array<RoleEnum>
}
