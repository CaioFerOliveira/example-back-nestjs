import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { Public } from 'src/core/decorator/public.decorator';
import { LocalGuard } from 'src/core/guards/local.guard';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @Public()
  create(@Body() credentials: LoginDto) {
    return this.authService.login(credentials);
  }

  @UseGuards(LocalGuard)
  @Get('status')
  status(@Req() request: Request) {
    request.user
    return "Method here";
  }
}
