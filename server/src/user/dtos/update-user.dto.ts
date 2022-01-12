import { IsOptional, IsEnum } from "class-validator";
import { Role } from '../../authorization/role.enum';



export class UpdateUserDto {

    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;
    
    @IsOptional()
    password: string;
    
    @IsOptional()
    confirmPassword: string;
    
    @IsEnum(Role)
    @IsOptional()
    role: string;
}