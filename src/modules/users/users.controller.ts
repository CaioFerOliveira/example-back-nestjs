import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Logger, HttpCode, ParseIntPipe, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Roles } from 'src/core/decorator/roles.decorator';
import { Public } from 'src/core/decorator/public.decorator';
import { RoleEnum } from 'src/core/enums/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService, private readonly logger: Logger) {}

  @Post()
  @Public()
  @HttpCode(201)
  create(@Body() createUserDto: CreateUserDto) {
    try {
      return this.usersService.create(createUserDto);

    } catch (error) {
      this.logger.error('Error fetching users', error);
      throw new HttpException('Error creating users', 500);
    }
  }

  @Get()
  findAll(): Promise<User[]> {
    try {
      return this.usersService.findAll();

    } catch (error) {
      this.logger.error('Error fetching users', error);
      throw new HttpException('Error fetching users', 500);
    }
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))id: number, 
    @Body() updateUserDto: UpdateUserDto
  )  {
    try {
      return this.usersService.findOne(+id);

    } catch (error) {
      this.logger.error(`Error fetching user with ${id}` , error);
      throw new HttpException(`Error fetching user with ${id}`, 500);
    }
  }

  @Patch(':id')
  update(
      @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))id: number, 
      @Body() updateUserDto: UpdateUserDto
  ) {
    try {
      return this.usersService.update(id, updateUserDto);

    } catch (error) {
      this.logger.error(`Error updating user with ${id}` , error);
      throw new HttpException(`Error updating user with ${id}`, 500);
    }
  }

  @Roles(RoleEnum.Admin)
  @Delete(':id')
  remove(
    @Param('id', new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }))id: number, 
    @Body() updateUserDto: UpdateUserDto
  )  {
    try {
      return this.usersService.remove(+id);

    } catch (error) {
      this.logger.error(`Error when removing user with ${id}` , error);
      throw new HttpException(`Error when removing user with ${id}`, 500);
    }
  }
}
