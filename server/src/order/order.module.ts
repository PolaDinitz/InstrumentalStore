import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { DatabaseModule } from 'src/database.module';
import { orderProviders } from './order.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [OrderController],
  providers: [OrderService, ...orderProviders],
  exports: [OrderService, ...orderProviders]
})
export class OrderModule {}
