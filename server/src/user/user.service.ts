import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from '../authorization/role.enum';
import { UpdateUserDto } from './dtos/update-user.dto';

@Injectable()
export class UserService {


    constructor(
        @Inject('USER_MODEL')
        private readonly userModel: Model<User>,
        ) {}

    public async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    
    public async getUserById(id : string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    public async getUserByEmail(email: string): Promise<User> {
        return this.userModel.findOne({ 'email': email}).exec();
    }

    public async updateUser(id: string, updateUserDto: UpdateUserDto) {
        const oldUser = await this.getUserById(id);
        
        let pass = oldUser.password;
        if (updateUserDto.password) {
            pass = await this.hashPassword(updateUserDto.password);
        }
        const newUser = {
            password: pass,
            firstName: updateUserDto.firstName || oldUser.firstName,
            lastName: updateUserDto.lastName || oldUser.lastName,
            role: updateUserDto.role || oldUser.role.toString(),
        }

        return this.userModel.findByIdAndUpdate(id, newUser);
    }

    public async deleteUser(id : string) {
        return this.userModel.findOneAndDelete({ "id": id}).exec();
    }

    public async register(createUserDto: CreateUserDto) :Promise<User>{
        const password = await this.hashPassword(createUserDto.password)
        const newUser = new this.userModel({
            email: createUserDto.email,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            password: password,
            role: Role.User
        });
        return newUser.save();
    }


    private async hashPassword(password : string) {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(password, salt); 
        return hashed;
    }
}
