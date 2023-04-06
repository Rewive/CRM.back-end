import { Injectable, ConflictException, UnauthorizedException, NotFoundException, } from '@nestjs/common';
import { TokenExpiredError } from 'jsonwebtoken';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Auth } from '../../schemas/auth.schema';
import { CreateAuthDto } from '../../dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

interface AuthResponse {
    status: string;
}

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(Auth.name) private AuthModel: Model<Auth>,
        private jwtService: JwtService,
    ) { }

    async create(CreateAuthDto: CreateAuthDto): Promise<object> {
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
        const token = this.jwtService.sign({ id: result._id },{ expiresIn: '30d' });

        // Сохранение токена в базе данных
        result.token = token;
        await result.save();

        // Создание токена для подтверждения регистрации с дополнительной информацией и сроком действия
        const confirmtoken = this.jwtService.sign(
            { id: result._id, type: 'confirmation', email: CreateAuthDto.email },
            { expiresIn: '7d' },
        );

        // Создание ссылки для подтверждения регистрации
        const confirmationLink = `http://localhost:3001/auth/confirm/${confirmtoken}`;

        return { access_token: token, link: confirmationLink };
    }

    async login(CreateAuthDto: CreateAuthDto): Promise<object> {
        // Поиск пользователя по адресу электронной почты
        const user = await this.AuthModel.findOne({ email: CreateAuthDto.email });
        if (!user) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // Проверка совпадения паролей с помощью argon2.verify()
        const passwordMatch = await argon2.verify(user.password, CreateAuthDto.password);
        if (!passwordMatch) {
            throw new UnauthorizedException('Invalid email or password');
        }

        // Создание токена JWT
        const token = this.jwtService.sign({ id: user._id });

        return { access_token: token };
    }

    async confirm(token: string): Promise<object> {
        let payload: { id: any; };
        try {
            // Проверка токена JWT
            payload = this.jwtService.verify(token);
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                throw new UnauthorizedException('Token expired');
            } else {
                throw new UnauthorizedException('Invalid token');
            }
        }

        // Поиск пользователя по идентификатору из токена
        const user = await this.AuthModel.findById(payload.id);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Обновление статуса пользователя на "подтвержденный"
        user.confirmed = true;
        await user.save();

        return { status: 'Confirmed' };
    }

    CheckAuth(): AuthResponse {
        return { status: "OK" };
    }
}