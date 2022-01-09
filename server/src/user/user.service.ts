import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {


    constructor(
        @Inject('USER_MODEL')
        private readonly userModel: Model<User>,
        ) {}

    public async getUsers(): Promise<User[]> {
        return this.userModel.find().exec();
    }
    
    public async register(createUserDto: CreateUserDto) :Promise<User>{
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }
}