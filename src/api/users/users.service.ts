import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users, UsersDocument } from '../../schemas/users.schema';
import { CreateUsersDto } from '../../dto/users.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}

  async read(): Promise<Users[]> {
    return this.usersModel.find().exec();
  }

  async create(createUsersDto: CreateUsersDto): Promise<Users> {
    const existingUser = await this.usersModel.findOne({ email: createUsersDto.email });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const createdUser = new this.usersModel(createUsersDto);
    return createdUser.save();
  }

  async update(createUsersDto: CreateUsersDto): Promise<Users> {
    const _id = new Types.ObjectId(createUsersDto.id);
    return this.usersModel.findByIdAndUpdate(_id, createUsersDto, { new: true });
  }

  async delete(createUsersDto: CreateUsersDto): Promise<{ status: string }> {
    const _id = new Types.ObjectId(createUsersDto.id);
    const deletedUser = await this.usersModel.findByIdAndDelete({ _id });
    if (!deletedUser) {
      throw new NotFoundException('User not found');
    }
    return { status: 'Deleted' };
  }
}