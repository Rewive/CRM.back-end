import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Users, UsersDocument } from './models';
import { CreateUsersDto, UpdateUsersDto, DeleteUsersDto, IdUsersDto } from './dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}

    async findAll(): Promise<Users[]> {
        return this.usersModel.find().exec();
    }

    async findOne(idUsersDto: IdUsersDto): Promise<Users> {
        if (!Types.ObjectId.isValid(idUsersDto.id)) {
            throw new BadRequestException('Invalid id');
        }
        const user = await this.usersModel.findById(idUsersDto.id);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    async create(createUsersDto: CreateUsersDto): Promise<Users> {
        const existingUser = await this.usersModel.findOne({ email: createUsersDto.email });
        if (existingUser) {
            throw new ConflictException('User with this email already exists');
        }
        const createdUser = new this.usersModel(createUsersDto);
        return createdUser.save();
    }

    async update(ctachidUsersDto: IdUsersDto, updateUsersDto: UpdateUsersDto): Promise<Users> {
        const { id } = ctachidUsersDto;
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id');
        }
        const updatedUser = await this.usersModel.findByIdAndUpdate(id, updateUsersDto, { new: true });
        if (!updatedUser) {
            throw new NotFoundException('User not found');
        }
        return updatedUser;
    }

    async remove(deleteUsersDto: DeleteUsersDto): Promise<{ status: string }> {
        const { id } = deleteUsersDto;
        if (!Types.ObjectId.isValid(id)) {
            throw new BadRequestException('Invalid id');
        }
        const deletedUser = await this.usersModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new NotFoundException('User not found');
        }
        return { status: 'Deleted' };
    }
}