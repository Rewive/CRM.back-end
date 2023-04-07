import { IsNotEmpty, IsOptional, IsString, IsEmail, IsInt, IsMongoId } from 'class-validator';

export class UpdateUsersDto {
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

  @IsInt()
  @IsOptional()
  @IsNotEmpty()
  public age: number;
}