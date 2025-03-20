import { Module } from '@nestjs/common';
import { SeleccionService } from './seleccion.service';
import { SeleccionController } from './seleccion.controller';
import { ObtencionDataController } from 'src/obtencion-data/obtencion-data.controller';
import { ObtencionDataModule } from 'src/obtencion-data/obtencion-data.module';

@Module({
  imports: [ObtencionDataModule],
  controllers: [SeleccionController],
  providers: [SeleccionService],
})
export class SeleccionModule { }
