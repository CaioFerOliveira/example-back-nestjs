import { RoleEnum } from "src/core/enums/role.enum";
export class User {
    id: string;
    username: string;
    password: string;
    name: string;
    email: string;
    roles?: Array<RoleEnum>

    constructor(data: Partial<User> = null) {
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
