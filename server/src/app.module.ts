import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { AuthModule } from './authentication/auth.module';

@Module({
  imports: [ AuthModule, UserModule],
  controllers: [AppController],
})
export class AppModule {}
