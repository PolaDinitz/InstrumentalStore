import {IsNotEmpty, IsEnum} from 'class-validator';
import { Category } from '../category.enum';

export class CreateInstrumentDto {
    @IsNotEmpty()
    instrumentName: string;
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    @IsEnum(Category)
    category: string
    @IsNotEmpty()
    price: number
}
