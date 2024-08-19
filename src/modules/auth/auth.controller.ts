import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/core/decorator/public.decorator';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @Public()
  create(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile() {
    return "Method here";
  }
}
