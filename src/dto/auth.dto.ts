import { IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';

export class CreateAuthDto {
    @IsString()
    @IsNotEmpty()
    public name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty()
    public password: string;
  }