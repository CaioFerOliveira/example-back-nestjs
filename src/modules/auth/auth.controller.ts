import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/core/guards/jwt.guard';
import { LocalAuthGuard } from 'src/core/guards/local.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UseGuards(LocalAuthGuard)
  create(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  status(@Req() request: Request) {
    return "Method here";
  }
}
