import { RoleEnum } from "src/core/enums/role.enum";


export class User {
    id: number;
    username: string;
    password: string;
    roles: Array<RoleEnum>
}
