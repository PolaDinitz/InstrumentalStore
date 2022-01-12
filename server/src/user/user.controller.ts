import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, UseGuards, Request, UnauthorizedException, BadRequestException, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole } from './user.schema';
import { UpdateUserDto } from './dtos/update-user.dto';

@Controller('user')
export class UserController {

    constructor (private userService: UserService) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async getUsers(@Request() req: any){
        if (req.role != UserRole.Admin){
            throw new UnauthorizedException;
        }
        return this.userService.getUsers();
    }


    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUser(@Request() req: any, @Param('id') id: string) {
        if (req.role != UserRole.Admin || req.userId != id){
            throw new UnauthorizedException;
        }
        return this.userService.getUserById(id);
    }

    @UseGuards(JwtAuthGuard)
    @Post(':id')
    async updateUser(@Request() req: any, @Param('id') id: string, @Body() updateUserDto : UpdateUserDto) {
        if (req.role != UserRole.Admin) {
            throw new UnauthorizedException;
        }
        if (!updateUserDto || (!updateUserDto.firstName && !updateUserDto.lastName && !updateUserDto.password && !updateUserDto.role)) {
            throw new BadRequestException;
        }
        if (updateUserDto.password && updateUserDto.confirmPassword && updateUserDto.password != updateUserDto.confirmPassword){
            throw new BadRequestException;
        }
        if ((updateUserDto.password && !updateUserDto.confirmPassword) || (!updateUserDto.password) && (updateUserDto.confirmPassword)){
            throw new BadRequestException;
        }
        return this.userService.updateUser(id, updateUserDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async deleteUser(@Request() req: any, @Param('id') id: string) {
        if (req.role != UserRole.Admin) {
            throw new UnauthorizedException;
        }
        return this.userService.deleteUser(id);
    }

    @Put()
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(createUserDto.email);
        if (user){
            throw new BadRequestException;
        }
        if (createUserDto.password != createUserDto.confirmPassword) {
            throw new HttpException('password and confirm does not match', HttpStatus.BAD_REQUEST);
        }
        console.log(createUserDto)
        this.userService.register(createUserDto);
    }

}
