import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { BusinessException } from 'src/core/exceptions/business-exception';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/auth.dto';


@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  public async login(credentials: LoginDto): Promise<any> {

    const user = await this.validateUser(credentials);

    return await this.generateToken(user.id);
  }

  public async validateUser(credentials: LoginDto) {
    const user = await this.usersService.userExist(credentials.username);

    if (!user) {
      throw new BusinessException('Credenciais incorretas', HttpStatus.UNAUTHORIZED);
    }
    const passwordsMacths = await bcrypt.compare(credentials.password, user.password);

    if (!passwordsMacths) {
      throw new BusinessException('Credenciais incorretas', HttpStatus.UNAUTHORIZED);
    }

    return user;
  }

  private async generateToken(userId: number) {
    //TODO ADICIONAR AS PERMISSÕES AO PAYLOAD DO JWT
    const acessToken = this.jwtService.sign({ userId });
    return { acessToken }
  }
}
