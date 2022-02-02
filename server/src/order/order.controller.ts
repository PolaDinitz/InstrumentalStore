import { Controller, Get, Post, Body, Patch, Param, Delete,UseGuards,Request, UnauthorizedException, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Roles } from 'src/authorization/roles.decorator';
import { Role } from 'src/authorization/role.enum';
import { JwtAuthGuard } from '../authentication/jwt-auth.guard';
import { RolesGuard } from '../authorization/roles.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getOrders(@Request() req: any){
    return this.orderService.getOrders();
  }

  @Get(':id')
  @Roles(Role.Admin,Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async getOrder(@Request() req: any, @Param('id') id: string){
    const order = await this.orderService.getOrderById(id);
    if(req.role != Role.Admin || req.userEmail != order.userEmail){
      throw new UnauthorizedException;
    }
    return order;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  async deleteOrder(@Request() req: any,@Param('id') id: string) {
    return this.orderService.deleteOrder(id);
  }

  @Put()
  async createOrder(@Body() createOrderDto: CreateOrderDto){
      this.orderService.createOrder(createOrderDto);
  }
}
