import { IsString, IsNotEmpty, MaxLength } from 'class-validator';

export class ConfirmAuthDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(300)
    public token: string;
}