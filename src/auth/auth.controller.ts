import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from '../dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('/')
    async create(@Body() createAuthDto: CreateAuthDto, @Request() req) {
      return this.authService.create(createAuthDto, req.res);
    }
}