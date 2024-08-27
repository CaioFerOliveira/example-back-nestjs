import { IsArray, IsNumber, IsString } from "class-validator";
import { Auditable } from "src/core/abstracts/auditable";
import { RoleEnum } from "src/core/enums/role.enum";
export class User extends Auditable {

    @IsNumber()
    id: number;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
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
