import { RoleEnum } from "src/core/enums/role.enum";

export class UserDto {
    readonly username: string;
    password: string;
    readonly name: string;
    readonly email: string;
    readonly role?: Array<RoleEnum>
}
