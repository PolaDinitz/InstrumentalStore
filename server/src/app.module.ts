import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./authentication/auth.module";
import { InstrumentModule } from "./instrument/instrument.module";
import { CategoryModule } from "./category/category.module";
import { OrderModule } from "./order/order.module";
import { AppGateway } from "./app.gateway";

@Module({
  imports: [AuthModule, UserModule, InstrumentModule, CategoryModule, OrderModule],
  controllers: [AppController],
  providers: [AppGateway],
})
export class AppModule {}
