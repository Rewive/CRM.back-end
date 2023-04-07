import { IsNotEmpty, IsString, IsEmail, IsInt } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public lastname: string;

  @IsString()
  @IsNotEmpty()
  public patronymic: string;

  @IsEmail()
  @IsNotEmpty()
  public email: string;

  @IsInt()
  @IsNotEmpty()
  public age: number;
}