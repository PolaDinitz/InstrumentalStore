import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.interface';

@Injectable()
export class OrderService {

  constructor(
    @Inject('ORDER_MODEL')
    private readonly orderModel: Model<Order>,
  ){}

  public async getOrders(): Promise<Order[]> {
    return this.orderModel.find().exec();
  }

  public async getOrderById(id: string): Promise<Order>{
    return this.orderModel.findById(id).exec();
  }

  public async getOrdersByUserEmail(userEmail: string): Promise<Order[]>{
    return this.orderModel.find({'userEmail': userEmail}).exec()
  }

  public async getOrdersByDate(date: string): Promise<Order[]>{
    return this.orderModel.find({'date': date}).exec()
  }

  public async deleteOrder(id:string){
    return this.orderModel.findOneAndDelete({"id": id}).exec();
  }

  public async createOrder(createOrderDto: CreateOrderDto): Promise<Order>{
    const newOrder = new this.orderModel({
      userEmail: createOrderDto.userEmail,
      date: createOrderDto.date,
      itemList: createOrderDto.itemList
    });
    return newOrder.save();
  }

}
