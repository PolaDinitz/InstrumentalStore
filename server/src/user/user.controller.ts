import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {

    constructor (private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsers(){
       return this.userService.getUsers();
    }


    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Param('id') id: string) {
        return this.userService.getUserById(id);
    }

    @Post()
    async register(@Body() createUserDto: CreateUserDto) {
        if (createUserDto.password != createUserDto.confirmPassword) {
            throw new HttpException('password and confirm does not match', HttpStatus.BAD_REQUEST);
        }
        console.log(createUserDto)
        this.userService.register(createUserDto);
    }
}
