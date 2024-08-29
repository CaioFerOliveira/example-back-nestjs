import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post, Req, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { Request } from 'express';
import { Roles } from 'src/core/decorator/roles.decorator';
import { RoleEnum } from 'src/core/enums/role.enum';
import { BusinessException } from 'src/core/exceptions/business-exception';
import { JwtAuthGuard } from 'src/core/guards/jwt.guard';
import { ZodValidationPipe } from 'src/core/pipes/zod-validation.pipe';
import { UserResponseDto } from './dto/user-dto-response';
import { UserDto } from './dto/user.dto';
import { USER_DTO_SCHEMA } from './schema/user-dto-zod-schema';
import { UsersService } from './users.service';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @UsePipes(new ZodValidationPipe(USER_DTO_SCHEMA))
  create(@Req() request: Request, @Body() createUserDto: UserDto) {
    try {
      return this.usersService.create(createUserDto);

    } catch (error) {
      throw new BusinessException('Error creating user');
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Sucesso' })
  @UseGuards(JwtAuthGuard)
  findAll(): Promise<Array<UserResponseDto>> {
    try {
      return this.usersService.findAll();

    } catch (error) {
      throw new BusinessException('Error fetching users');
    }
  }

  @Get('/:id')
  @ApiResponse({ status: 200, description: 'Sucesso ao buscar usuário' })
  @UseGuards(JwtAuthGuard)
  findOne(
    @Param('id') id: string,
  ) {
    try {
      return this.usersService.findById(+id);

    } catch (error) {
      throw new BusinessException(error.message);
    }
  }

  @Patch(':id')
  @ApiResponse({ status: 204, description: 'Usuário atualizado com sucesso' })
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id') id: string,
    @Body() dto: UserDto,
    @Req() req: Request
  ) {
    try {
      return this.usersService.update(+id, dto, req);

    } catch (error) {
      throw new BusinessException(`Error updating user with ${id}`);
    }
  }

  @Roles(RoleEnum.Admin)
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    try {
      return this.usersService.remove(+id);

    } catch (error) {
      throw new BusinessException(`Error when removing user with ${id}`);
    }
  }
}
