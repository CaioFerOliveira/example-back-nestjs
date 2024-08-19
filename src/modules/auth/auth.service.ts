import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { access } from 'fs';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';


@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService){}

  public async signIn(dto: AuthDto): Promise<any> {
    if (this.validateUser(dto)) {
      throw new UnauthorizedException();
    }
    const user = await this.usersService.findBy(dto.username);

    const payload = {sub: user.id, username: user.username}

    return {access_token: await this.jwtService.signAsync(payload)};
  }

  private async validateUser(dto: AuthDto): Promise<any> {
    const user = await this.usersService.findBy(dto.username);
    if (user && this.usersService.comparePasswords(user.password, dto.password)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
