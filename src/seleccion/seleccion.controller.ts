import { Controller, Get, Query } from '@nestjs/common';
import { SeleccionService } from './seleccion.service';
@Controller('seleccion')
export class SeleccionController {
  constructor(private readonly seleccionService: SeleccionService) {}

    @Get('/seleccionar')
    seleccionFinal(@Query('rut') rut: string) {
      return this.seleccionService.seleccionFinal(rut)
    }
  
}
