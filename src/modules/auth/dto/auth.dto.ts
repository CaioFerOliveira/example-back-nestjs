import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: 'Username enviado pelo usuário',
        type: String,
    })
    @IsString()
    readonly username: string;

    @ApiProperty({
        description: 'Password enviado pelo usuário',
        type: String,
    })
    @IsString()
    @MinLength(8, { message: 'O password deve possuir pelo menos 8 caracteres' })
    @Matches(/^(?=.*[0-9])/, { message: 'O password deve conter pelo menos um caractere numérico' })
    readonly password: string;

    constructor(data: Partial<LoginDto>) {
        if (data) {
            Object.assign(this, {
                username: data.username,
                password: data.password
            })
        }
    }
}
