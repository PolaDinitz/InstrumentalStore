import {IsNotEmpty, IsEnum, IsDate, IsArray, IsEmail} from 'class-validator';

export class CreateOrderDto {
    @IsNotEmpty()
    @IsEmail()
    userEmail: string;
    @IsNotEmpty()
    @IsDate()
    date: string;
    @IsArray()
    @IsNotEmpty()
    itemList: [{instumentName: string,qountity:number}];

}
