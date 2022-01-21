import {IsNotEmpty, IsEnum} from 'class-validator';
import { Category } from '../category.enum';

export class CreateInstrumentDto {
    @IsNotEmpty()
    instumentName: string;
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    photoUrl: string
    @IsNotEmpty()
    @IsEnum(Category)
    category: string
    @IsNotEmpty()
    price: number
}
