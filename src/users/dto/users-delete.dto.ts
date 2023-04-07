import { IsString, IsMongoId } from 'class-validator';

export class DeleteUsersDto {
  @IsString()
  @IsMongoId()
  public id: string;
}