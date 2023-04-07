import { IsString, IsMongoId } from 'class-validator';

export class IdUsersDto {
  @IsString()
  @IsMongoId()
  public id: string;
}