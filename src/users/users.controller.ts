import { Controller, Post, Get, Body, UseGuards, Param, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto, DeleteUsersDto, UpdateUsersDto, IdUsersDto } from './dto'
import { JwtAuthGuard } from '../guards/jwt-auth.guards';
import { ThrottlerGuard } from '@nestjs/throttler';

@UseGuards(ThrottlerGuard) 
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param() idUsersDto: IdUsersDto) {
    return this.usersService.findOne(idUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() createUsersDto: CreateUsersDto) {
    return this.usersService.create(createUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(@Param() catchidUsersDto: IdUsersDto, @Body() updateUsersDto: UpdateUsersDto) {
    console.log('update route called with:', catchidUsersDto, updateUsersDto);
    return this.usersService.update(catchidUsersDto, updateUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param() deleteUsersDto: DeleteUsersDto) {
    return this.usersService.remove(deleteUsersDto);
  }
}