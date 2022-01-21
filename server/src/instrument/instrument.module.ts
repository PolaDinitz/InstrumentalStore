import { Module } from '@nestjs/common';
import { InstrumentService } from './instrument.service';
import { InstrumentController } from './instrument.controller';
import { DatabaseModule } from 'src/database.module';
import { instrumentProviders } from './instrument.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [InstrumentController],
  providers: [InstrumentService, ...instrumentProviders],
  exports: [InstrumentService, ...instrumentProviders],
})
export class InstrumentModule {}
