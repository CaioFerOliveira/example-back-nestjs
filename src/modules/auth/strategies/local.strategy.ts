import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { LoginDto } from "../dto/auth.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    validate(username: string, password: string) {
        const user = this.authService.validateUser(new LoginDto({ login: username, password: password }));
        if (!user) {
            throw new UnauthorizedException('Credenciais incorretas');
        }
        return user;
    }
}