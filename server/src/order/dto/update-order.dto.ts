import { PartialType } from '@nestjs/mapped-types';
import { CreateOrderDto } from './create-order.dto';
import { IsOptional,IsDate,IsArray, IsEmail } from 'class-validator'

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsOptional()
    @IsEmail()
    userEmail: string;
    @IsOptional()
    @IsDate()
    date: string;
    @IsArray()
    @IsOptional()
    itemList: [{instrumentName: string,quantity:number}];
    @IsOptional()
    orderAddress: string;
}
