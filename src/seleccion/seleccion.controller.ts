import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SeleccionService } from './seleccion.service';
import { CreateSeleccionDto } from './dto/create-seleccion.dto';
import { UpdateSeleccionDto } from './dto/update-seleccion.dto';

@Controller('seleccion')
export class SeleccionController {
  constructor(private readonly seleccionService: SeleccionService) {}

  
}
