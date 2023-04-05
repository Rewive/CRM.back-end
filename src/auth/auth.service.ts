import { Injectable, ConflictException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from '../schemas/auth.schema';
import { CreateAuthDto } from '../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Response } from 'express';

interface AuthResponse {
    status: string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth.name) private AuthModel: Model<Auth>,
        private jwtService: JwtService,
    ) {}

    async create(CreateAuthDto: CreateAuthDto, res: Response): Promise<object> {
        // Проверка на наличие пользователя с таким же адресом электронной почты
        const existingUser = await this.AuthModel.findOne({ email: CreateAuthDto.email });
        if (existingUser) {
            throw new ConflictException('Email already exists');
        }

        // Хеширование пароля с помощью argon2i
        const hashedPassword = await argon2.hash(CreateAuthDto.password, { type: argon2.argon2i });

        // Сохранение пользователя в базе данных с хешированным паролем
        const createdAuth = new this.AuthModel({ ...CreateAuthDto, password: hashedPassword });
        const result = await createdAuth.save();

        // Создание токена JWT
        const token = this.jwtService.sign({ id: result._id });

        // Сохранение токена в базе данных
        result.token = token;
        await result.save();

        // Отправка токена в кукис
        res.cookie('jwt', token, { httpOnly: true });

        return { access_token: token };
    }

    CheckAuth(): AuthResponse {
        return {status: "OK"};
    }
}