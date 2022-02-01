import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpException, HttpStatus, UseGuards, Request, UnauthorizedException} from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { CreateInstrumentDto } from './dto/create-instrument.dto';
import { UpdateInstrumentDto } from './dto/update-instrument.dto';
import { Roles } from '../authorization/roles.decorator';
import { RolesGuard } from '../authorization/roles.guard';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { Role } from 'src/authorization/role.enum';

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
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getInstrument(@Request() req: any, @Param('id') id: string) {
    if (req.role != Role.Admin){
      throw new UnauthorizedException;
    }

    return this.instrumentService.getInstrumentByID(id);
    
  }

  @Patch(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async updateInstrumnet(@Request() req: any,@Param('id') id: string, @Body() updateInstrumentDto: UpdateInstrumentDto) {
    return this.instrumentService.updateInstrumnet(id, updateInstrumentDto);
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteInstrument(@Request() req: any, @Param('id') id: string) {
    return this.instrumentService.deleteInstrument(id);
  }

  @Put()
  async createInstrumnet(@Body() createInstrumentDto: CreateInstrumentDto) {
    const instrument = this.instrumentService.getInstrumentByName(createInstrumentDto.instumentName);
    if(instrument) {
      throw new HttpException('instrument already exists', HttpStatus.BAD_REQUEST);
    }
    if(createInstrumentDto.price < 0) {
      throw new HttpException('Price connot be negative', HttpStatus.BAD_REQUEST);

    }
    return this.instrumentService.createInstrument(createInstrumentDto);
  }
}
