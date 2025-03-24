import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EvaluacionService } from './evaluacion.service';

@Controller('evaluacion')
export class EvaluacionController {
  constructor(private readonly evaluacionService: EvaluacionService) { }


  @Get('/evaluador')
  datosEvaluador(@Query('rut') rut: string) {
    return this.evaluacionService.obtencionInformacionEvaluador(rut)
  }


}
