import { Controller, Post, Get, Body, Request, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignAuthDto, LoginAuthDto, ConfirmAuthDto } from './dto';

@Controller('api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/sign')
    async sign(@Body() signAuthDto: SignAuthDto) {
        return this.authService.sign(signAuthDto);
    }

    @Post('/login')
    async login(@Body() loginAuthDto: LoginAuthDto, @Request() req) {
        return this.authService.login(loginAuthDto);
    }

    @Get('/confirm/:token')
    async confirm(@Param() params: ConfirmAuthDto) {
        return this.authService.confirm(params.token);
    }
}