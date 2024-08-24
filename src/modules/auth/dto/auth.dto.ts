import { ApiProperty } from "@nestjs/swagger";
import { IsString, Matches, MinLength } from "class-validator";

export class LoginDto {
    @ApiProperty({
        description: 'Login enviado pelo usuário',
        type: String,
    })
    @IsString()
    readonly login: string;

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
                login: data.login,
                password: data.password
            })
        }
    }
}
