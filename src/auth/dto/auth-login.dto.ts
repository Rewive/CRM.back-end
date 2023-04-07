import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class LoginAuthDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    public password: string;
  }