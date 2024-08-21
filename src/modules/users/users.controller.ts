import { Body, Controller, Delete, Get, HttpCode, HttpException, Param, Patch, Post, UsePipes } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/core/decorator/public.decorator';
import { Roles } from 'src/core/decorator/roles.decorator';
import { RoleEnum } from 'src/core/enums/role.enum';
import { ZodValidationPipe } from 'src/core/pipes/zod-validation.pipe';
import { UserDto } from './dto/user.dto';
import { User } from './entities/user.entity';
import { USER_DTO_SCHEMA } from './schema/user-dto-zod-schema';
import { UsersService } from './users.service';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @Public()
  @HttpCode(201)
  @UsePipes(new ZodValidationPipe(USER_DTO_SCHEMA))
  create(@Body() createUserDto: UserDto) {
    try {
      return this.usersService.create(createUserDto);

    } catch (error) {
      throw new HttpException('Error creating users', 500);
    }
  }

  @Get()
  findAll(): Promise<User[]> {
    try {
      return this.usersService.findAll();

    } catch (error) {
      throw new HttpException('Error fetching users', 500);
    }
  }

  @Get(':id')
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
