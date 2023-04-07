import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class SignAuthDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    public lastname: string;

    @IsString()
    @IsNotEmpty()
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    public password: string;
  }