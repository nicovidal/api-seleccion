import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; // ✅ Importar HttpModule
import { ObtencionDataService } from './obtencion-data.service';
import { ObtencionDataController } from './obtencion-data.controller';


@Module({
  imports: [HttpModule], 
  providers: [ObtencionDataService],
  controllers: [ObtencionDataController],
  exports: [ObtencionDataService],
})
export class ObtencionDataModule {}