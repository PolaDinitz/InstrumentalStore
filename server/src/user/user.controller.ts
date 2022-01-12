import { Controller, Get, Post, Body, Param, HttpException, HttpStatus, UseGuards, Request, UnauthorizedException, BadRequestException, Delete, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Role } from '../common/role.enum';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Roles } from '../common/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('user')
export class UserController {

    constructor (private userService: UserService) {}

    
    @Get()
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getUsers(@Request() req: any){
        return this.userService.getUsers();
    }


    
    @Get(':id')
    @Roles(Role.Admin, Role.User)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async getUser(@Request() req: any, @Param('id') id: string) {
        if (req.role != Role.Admin || req.userId != id){
            throw new UnauthorizedException;
        }
        return this.userService.getUserById(id);
    }

    @Post(':id')
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async updateUser(@Request() req: any, @Param('id') id: string, @Body() updateUserDto : UpdateUserDto) {
        if (updateUserDto.password && updateUserDto.confirmPassword && updateUserDto.password != updateUserDto.confirmPassword){
            throw new HttpException('password and confirm does not match', HttpStatus.BAD_REQUEST);
        }
        if ((updateUserDto.password && !updateUserDto.confirmPassword) || (!updateUserDto.password) && (updateUserDto.confirmPassword)){
            throw new HttpException('password and confirm does not match', HttpStatus.BAD_REQUEST);        }
        return this.userService.updateUser(id, updateUserDto);
    }

    @Delete(':id')
    @Roles(Role.Admin)
    @UseGuards(JwtAuthGuard, RolesGuard)
    async deleteUser(@Request() req: any, @Param('id') id: string) {
        return this.userService.deleteUser(id);
    }

    @Put()
    async register(@Body() createUserDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(createUserDto.email);
        if (user){
            throw new HttpException('email already exists', HttpStatus.BAD_REQUEST);
        }
        if (createUserDto.password != createUserDto.confirmPassword) {
            throw new HttpException('password and confirm does not match', HttpStatus.BAD_REQUEST);
        }
        this.userService.register(createUserDto);
    }

}
