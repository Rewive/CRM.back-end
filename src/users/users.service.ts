import { Injectable, ConflictException, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Users, UsersDocument } from './models';
import { CreateUsersDto, UpdateUsersDto, DeleteUsersDto, IdUsersDto } from './dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel(Users.name) private usersModel: Model<UsersDocument>) {}

    async findAll(): Promise<Users[]> {
        return this.usersModel.find().exec();
    }

    async findOne(idUsersDto: IdUsersDto): Promise<Users> {
        try {
            const user = await this.usersModel.findById(idUsersDto.id).orFail();
            return user;
        } catch (error) {
            if (error.name === 'DocumentNotFoundError') {
                throw new NotFoundException('User not found');
            }
            throw new BadRequestException('Invalid id');
        }
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
        try {
            const updatedUser = await this.usersModel.findByIdAndUpdate(ctachidUsersDto.id, updateUsersDto, { new: true }).orFail();
            return updatedUser;
        } catch (error) {
            if (error.name === 'DocumentNotFoundError') {
                throw new NotFoundException('User not found');
            }
            throw new BadRequestException('Invalid id');
        }
    }

    async remove(deleteUsersDto: DeleteUsersDto): Promise<{ status: string }> {
        try {
            await this.usersModel.findByIdAndDelete(deleteUsersDto.id).orFail();
            return { status: 'Deleted' };
        } catch (error) {
            if (error.name === 'DocumentNotFoundError') {
                throw new NotFoundException('User not found');
            }
            throw new BadRequestException('Invalid id');
        }
    }
}