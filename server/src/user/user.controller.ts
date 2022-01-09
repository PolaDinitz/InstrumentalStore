import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './create-user.dto';
@Controller('user')
export class UserController {

    constructor (private userService: UserService) {}

    @Get()
    async getUsers(){
       return this.userService.getUsers();
    }

    @Post()
    async register(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto)
        this.userService.register(createUserDto);
    }
}
