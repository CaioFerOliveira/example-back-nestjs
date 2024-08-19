import { Auditable } from "src/core/abstracts/auditable";
import { RoleEnum } from "src/core/enums/role.enum";
export class User extends Auditable {
    id: string;
    username: string;
    password: string;
    name: string;
    email: string;
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
