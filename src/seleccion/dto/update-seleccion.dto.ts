import { PartialType } from '@nestjs/mapped-types';
import { CreateSeleccionDto } from './create-seleccion.dto';

export class UpdateSeleccionDto extends PartialType(CreateSeleccionDto) {}
