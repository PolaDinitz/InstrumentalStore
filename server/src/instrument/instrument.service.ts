import { Inject, Injectable } from "@nestjs/common";
import { CreateInstrumentDto } from "./dto/create-instrument.dto";
import { UpdateInstrumentDto } from "./dto/update-instrument.dto";
import { Model } from "mongoose";
import { Instrument } from "./instrument.interface";
import { DEFAULT_IMAGE_FILE_NAME, IMAGES_ASSETS_PATH } from "../consts/images.consts";
import * as fs from 'fs';

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
    return this.instrumentModel.findOne({ 'instrumentName': name }).exec();
  }

  public async updateInstrument(id : string, updateInstrumentDto: UpdateInstrumentDto, imageFile: Express.Multer.File){
    const oldInstrument = await this.getInstrumentByID(id)
    if (imageFile && oldInstrument.photoUrl !== DEFAULT_IMAGE_FILE_NAME) {
      fs.unlinkSync(IMAGES_ASSETS_PATH + oldInstrument.photoUrl);
    }
    const newInstrument = {
       instrumentName: updateInstrumentDto.instrumentName || oldInstrument.instrumentName,
       description: updateInstrumentDto.description || oldInstrument.description,
       photoUrl: imageFile?.filename || oldInstrument.photoUrl,
       category: updateInstrumentDto.category || oldInstrument.category.toString(),
       price: updateInstrumentDto.price || oldInstrument.price,
    }

    return this.instrumentModel.findByIdAndUpdate(id, newInstrument, { returnOriginal: false });
  }

  public async deleteInstrument(id : string){
    return this.instrumentModel.findByIdAndDelete(id).exec();
  }


  public async createInstrument(createInstrumentDto: CreateInstrumentDto, imageFile: Express.Multer.File) :Promise<Instrument>{
      const newInstrument = new this.instrumentModel({
        instrumentName: createInstrumentDto.instrumentName,
        description: createInstrumentDto.description,
        photoUrl: imageFile?.filename || DEFAULT_IMAGE_FILE_NAME,
        category: createInstrumentDto.category,
        price: createInstrumentDto.price, 
      });

      return newInstrument.save();
  }
}
