import { Inject, Injectable } from '@nestjs/common';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Model } from 'mongoose';
import {Instrument} from './instrument.interface';
@Injectable()
export class InstrumentService {

  constructor(
    @Inject('INSTRUMENT_MODEL')
    private instrumentModel: Model<Instrument>,
  ){}

  public async getInstruments(): Promise<Instrument[]> {
    return this.instrumentModel.find().exec();
  }

  public async getInstrumentsByCategory(category: string): Promise<Instrument[]>{
    return this.instrumentModel.find({'category': category}).exec();
  }

  public async getInstrumentByID(id: string): Promise<Instrument> {
    return this.instrumentModel.findById(id).exec();
  }

  public async getInstrumentByName(name: string): Promise<Instrument>{
    return this.instrumentModel.findOne({ 'instumentName': name }).exec();
  }

  public async updateInstrumnet(id : string,updateInstrumentDto: UpdateInstrumentDto){
    const oldInstrument = await this.getInstrumentByID(id)

    const newInstrument = { 
       instumentName: updateInstrumentDto.instumentName || oldInstrument.instumentName,
       description: updateInstrumentDto.description || oldInstrument.description,
       photoUrl: updateInstrumentDto.photoUrl || oldInstrument.photoUrl,
       category: updateInstrumentDto.category || oldInstrument.category.toString(),
       price: updateInstrumentDto.price || oldInstrument.price,
    }

    return this.instrumentModel.findByIdAndUpdate(id,newInstrument);
  }

  public async deleteInstrument(id : string){
    return this.instrumentModel.findOneAndDelete({ "id":id}).exec();
  }


  public async createInstrument(createInstrumentDto: CreateInstrumentDto) :Promise<Instrument>{
      const newInstrument = new this.instrumentModel({
        instumentName: createInstrumentDto.instumentName,
        description: createInstrumentDto.description,
        photoUrl: createInstrumentDto.photoUrl,
        category: createInstrumentDto.category,
        price: createInstrumentDto.price, 
      });

      return newInstrument.save();
  }
}
