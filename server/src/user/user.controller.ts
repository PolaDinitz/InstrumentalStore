import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginDto } from './dtos/login.dto';
@Controller('user')
export class UserController {

    constructor (private userService: UserService) {}

    @Get()
    async getUsers(){
       return this.userService.getUsers();
    }

    @Get(':id')
    async getUser(@Param('id') id: string) {
        return this.userService.getUser(id);
    }

    @Post()
    async register(@Body() createUserDto: CreateUserDto) {
        if (createUserDto.password != createUserDto.confirmPassword) {
            throw new HttpException('password and confirm does not match', HttpStatus.BAD_REQUEST);
        }
        console.log(createUserDto)
        this.userService.register(createUserDto);
    }

    @Post('Login')
    async login(@Body() loginDto: LoginDto) {
        console.log(loginDto);
        this.userService.login(loginDto);
    }

}
