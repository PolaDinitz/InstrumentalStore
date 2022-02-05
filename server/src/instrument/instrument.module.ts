import { Module } from "@nestjs/common";
import { InstrumentService } from "./instrument.service";
import { InstrumentController } from "./instrument.controller";
import { DatabaseModule } from "src/database.module";
import { instrumentProviders } from "./instrument.providers";
import { MulterModule } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName, imageFileFilter } from "../utils/file-upload.utils";

@Module({
  imports: [
    DatabaseModule,
    MulterModule.register({
      storage: diskStorage({
        destination: './images/',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter
    })],
  controllers: [InstrumentController],
  providers: [InstrumentService, ...instrumentProviders],
  exports: [InstrumentService, ...instrumentProviders],
})
export class InstrumentModule {}
