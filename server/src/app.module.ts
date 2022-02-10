import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./authentication/auth.module";
import { InstrumentModule } from "./instrument/instrument.module";
import { OrderModule } from "./order/order.module";

@Module({
  imports: [ AuthModule, UserModule, InstrumentModule, OrderModule],
  controllers: [AppController],
})
export class AppModule {}
