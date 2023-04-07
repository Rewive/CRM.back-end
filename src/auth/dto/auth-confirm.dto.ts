import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmAuthDto {
    @IsString()
    @IsNotEmpty()
    public token: string;
  }