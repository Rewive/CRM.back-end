import { Controller, Post, Get, Body, Request, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from '../../dto/auth.dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/sign')
    async create(@Body() createAuthDto: CreateAuthDto) {
        return this.authService.create(createAuthDto);
    }

    @Post('/login')
    async login(@Body() createAuthDto: CreateAuthDto, @Request() req) {
        return this.authService.login(createAuthDto);
    }

    @Get('/confirm/:token')
    async confirm(@Param('token') token: string) {
        return this.authService.confirm(token);
    }
}