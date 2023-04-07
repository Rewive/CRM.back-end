import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsersDocument = Users & Document;

@Schema()
export class Users {
  @Prop()
  name: string;

  @Prop()
  lastname: string;

  @Prop()
  patronymic: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ type: Number })
  age: number;
}

export const UsersSchema = SchemaFactory.createForClass(Users);