import { IsString, Matches, MinLength } from "class-validator";

export class LoginDto {
    @IsString()
    readonly login: string;

    @IsString()
    @MinLength(8, { message: 'O password deve possuir pelo menos 8 caracteres' })
    @Matches(/^(?=.*[0-9])/, { message: 'O password deve conter pelo menos um caractere numérico' })
    readonly password: string;
}
