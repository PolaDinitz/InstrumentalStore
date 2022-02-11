import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Put,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from "@nestjs/common";
import { InstrumentService } from "./instrument.service";
import { CreateInstrumentDto } from "./dto/create-instrument.dto";
import { UpdateInstrumentDto } from "./dto/update-instrument.dto";
import { Roles } from "../authorization/roles.decorator";
import { RolesGuard } from "../authorization/roles.guard";
import { JwtAuthGuard } from "../authentication/jwt-auth.guard";
import { Role } from "src/authorization/role.enum";
import { FileInterceptor } from "@nestjs/platform-express";
import * as fs from "fs";
import { DEFAULT_IMAGE_FILE_NAME, IMAGES_ASSETS_PATH } from "../consts/images.consts";

@Controller('instrument')
export class InstrumentController {

  constructor(private instrumentService: InstrumentService) {}

  @Get()
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getInstruments(@Request() req: any){
    return this.instrumentService.getInstruments();
  }

  @Get(':id')
  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getInstrument(@Request() req: any, @Param('id') id: string) {
    return this.instrumentService.getInstrumentByID(id);
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('image'))
  async updateInstrument(@Request() req: any, @Param('id') id: string, @Body() updateInstrumentDto: UpdateInstrumentDto, @UploadedFile() imageFile: Express.Multer.File) {
    return this.instrumentService.updateInstrument(id, updateInstrumentDto, imageFile);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteInstrument(@Request() req: any, @Param('id') id: string) {
    const instrumentToDelete = await this.instrumentService.getInstrumentByID(id);
    const photoToDelete = instrumentToDelete.photoUrl;
    return this.instrumentService.deleteInstrument(id).then(() => {
      if (photoToDelete !== DEFAULT_IMAGE_FILE_NAME)
        fs.unlinkSync(IMAGES_ASSETS_PATH + instrumentToDelete.photoUrl);
    })
  }

  @Put()
  @Roles(Role.Admin)
  @UseInterceptors(FileInterceptor('image'))
  async createInstrument(@Body() createInstrumentDto: CreateInstrumentDto, @UploadedFile() imageFile: Express.Multer.File) {
    const instrument = await this.instrumentService.getInstrumentByName(createInstrumentDto.instrumentName);
    if(instrument) {
      throw new HttpException('instrument already exists', HttpStatus.BAD_REQUEST);
    }
    if(createInstrumentDto.price < 0) {
      throw new HttpException('Price cannot be negative', HttpStatus.BAD_REQUEST);

    }
    return this.instrumentService.createInstrument(createInstrumentDto, imageFile);
  }
}
