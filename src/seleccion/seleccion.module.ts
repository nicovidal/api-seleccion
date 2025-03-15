import { Module } from '@nestjs/common';
import { SeleccionService } from './seleccion.service';
import { SeleccionController } from './seleccion.controller';
import { ObtencionDataController } from 'src/obtencion-data/obtencion-data.controller';

@Module({
  controllers: [SeleccionController,ObtencionDataController],
  providers: [SeleccionService],
})
export class SeleccionModule {}
