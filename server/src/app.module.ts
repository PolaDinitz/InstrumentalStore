import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';
import { InstrumentModule } from './instrument/instrument.module';
import { CategoryModule } from "./category/category.module";

@Module({
  imports: [ AuthModule, UserModule, InstrumentModule, CategoryModule ],
  controllers: [AppController],
})
export class AppModule {}
