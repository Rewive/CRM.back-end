import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './api/auth/auth.controller';
import { AuthService } from './api/auth/auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Auth, AuthSchema } from './schemas/auth.schema';
import { databaseConstants, jwtConstants } from './constants';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './api/strategy/jwt.strategy';
import { UsersController } from './api/users/users.controller';
import { UsersService } from './api/users/users.service';
import { Users, UsersSchema } from './schemas/users.schema';
import { ApiController } from './api/api.controller';
import { ApiService } from './api/api.service';

@Module({
  imports: [
    MongooseModule.forRoot(databaseConstants.uri),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    MongooseModule.forFeature([{ name: Users.name, schema: UsersSchema }]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AppController, AuthController, UsersController, ApiController],
  providers: [AppService, AuthService, JwtStrategy, UsersService, ApiService],
})
export class AppModule { }