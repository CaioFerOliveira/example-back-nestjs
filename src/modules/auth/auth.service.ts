import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/auth.dto';


@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  public async login(credentials: LoginDto): Promise<any> {
    const user = await this.usersService.userExist(credentials.login);

    if (!user) {
      throw new UnauthorizedException('Credenciais incorretas');
    }
    const passwordsMacths = await bcrypt.compare(credentials.password, user.password);

    if (!passwordsMacths) {
      throw new UnauthorizedException('Credenciais incorretas');
    }

    return await this.generateUserToken(user.id);
  }

  private async generateUserToken(userId: string) {
    const acessToken = this.jwtService.sign({ userId })
    return { acessToken }
  }
}
