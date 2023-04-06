import { IsNotEmpty, IsOptional, IsString, IsEmail, IsInt, IsMongoId } from 'class-validator';

export class CreateUsersDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public lastname: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public patronymic: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  public email: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  public password: string;

  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  public age: number;

  @IsString()
  @IsMongoId()
  public id: string;
}