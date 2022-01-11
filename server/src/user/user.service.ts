import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './user.interface';
import { CreateUserDto } from './dtos/create-user.dto';
import * as bcrypt from 'bcrypt';

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

    public async register(createUserDto: CreateUserDto) :Promise<User>{
        // make sure email not exist
        const password = await this.hashPassword(createUserDto.password)
        const newUser = new this.userModel({
            email: createUserDto.email,
            firstName: createUserDto.firstName,
            lastName: createUserDto.lastName,
            password: password
        });
        return newUser.save();
    }


    private async hashPassword(password : string) {
        const salt = await bcrypt.genSalt();
        const hashed = await bcrypt.hash(password, salt); 
        return hashed;
    }
}
