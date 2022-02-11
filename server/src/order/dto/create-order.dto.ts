import { IsArray, IsEmail, IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    @IsEmail()
    userEmail: string;
    @IsArray()
    @IsNotEmpty()
    itemList: [{instrumentName: string,quantity:number, price: number}];
    @IsNotEmpty()
    orderAddress: string;
}
