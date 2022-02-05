import { PartialType } from '@nestjs/mapped-types';
import { CreateInstrumentDto } from './create-instrument.dto';
import { IsOptional, IsEnum } from 'class-validator'
import { Category } from '../category.enum';


export class UpdateInstrumentDto extends PartialType(CreateInstrumentDto) {

    @IsOptional()
    instrumentName: string;
    @IsOptional()
    description: string;
    @IsOptional()
    @IsEnum(Category)
    category: string;
    @IsOptional()
    price: number;
}
