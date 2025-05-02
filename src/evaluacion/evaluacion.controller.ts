import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';
import { ClienteEvaluado } from '../../dist/interfaces/datos-evaluadores.interface';

@Controller('evaluacion')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) { }


  @Get('/evaluador')
  datosEvaluador(@Query('rut') rut: string) {
    return this.evaluacionService.obtencionInformacionEvaluador(rut)
  }


  @Post('/ingresoCliente')
  crearCliente(ClienteEvaluado){
    return this.evaluacionService.guardarNuevoCliente(ClienteEvaluado);
  }

}
