import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from '../../dto/users.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guards';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/')
  async read() {
    return this.usersService.read();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() CreateUsersDto: CreateUsersDto) {
    return this.usersService.create(CreateUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/update')
  async update(@Body() CreateUsersDto: CreateUsersDto) {
    return this.usersService.update(CreateUsersDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/delete')
  async delete(@Body() CreateUsersDto: CreateUsersDto) {
    return this.usersService.delete(CreateUsersDto);
  }
}