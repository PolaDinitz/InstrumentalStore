import { IsOptional, IsEnum } from "class-validator";
import { UserRole } from "../user.schema";



export class UpdateUserDto {

    @IsOptional()
    firstName: string;

    @IsOptional()
    lastName: string;
    
    @IsOptional()
    password: string;
    
    @IsOptional()
    confirmPassword: string;
    
    @IsEnum(UserRole)
    @IsOptional()
    role: string;
}