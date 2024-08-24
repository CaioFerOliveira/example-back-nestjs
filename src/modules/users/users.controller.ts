import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { Public } from 'src/core/decorator/public.decorator';
import { Roles } from 'src/core/decorator/roles.decorator';
import { RoleEnum } from 'src/core/enums/role.enum';
import { ZodValidationPipe } from 'src/core/pipes/zod-validation.pipe';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { USER_DTO_SCHEMA } from './schema/user-dto-zod-schema';
import { UsersService } from './users.service';

@ApiHeader({
  name: 'Users',
  description: 'Controller de usuários',
})
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Public()
  @HttpCode(201)
  @ApiResponse({ status: 201, description: 'Usuário criado com sucesso' })
  @UsePipes(new ZodValidationPipe(USER_DTO_SCHEMA))
  create(@Body() createUserDto: UserDto) {
    try {
      return this.usersService.create(createUserDto);

    } catch (error) {
      throw new HttpException('Error creating user', 500);
    }
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Sucesso' })
  findAll(): Promise<Array<User>> {
    try {
      return this.usersService.findAll();

    } catch (error) {
      throw new HttpException('Error fetching users', 500);
    }
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Sucesso ao buscar usuário' })
  findOne(
    @Param('id') id: string,
  ) {
    try {
      return this.usersService.findOne(id);

    } catch (error) {
      throw new HttpException(`Error fetching user with ${id}`, 500);
    }
  }

  @Patch(':id')
  @ApiResponse({ status: 204, description: 'Usuário atualizado com sucesso' })
  update(
    @Param('id') id: string,
    @Body() dto: UserDto
  ) {
    try {
      return this.usersService.update(id, dto);

    } catch (error) {
      throw new HttpException(`Error updating user with ${id}`, 500);
    }
  }

  @Roles(RoleEnum.Admin)
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  @Delete(':id')
  remove(
    @Param('id') id: string,
  ) {
    try {
      return this.usersService.remove(id);

    } catch (error) {
      throw new HttpException(`Error when removing user with ${id}`, 500);
    }
  }
}
