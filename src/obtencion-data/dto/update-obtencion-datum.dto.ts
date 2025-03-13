import { PartialType } from '@nestjs/mapped-types';
import { CreateObtencionDatumDto } from './create-obtencion-datum.dto';

export class UpdateObtencionDatumDto extends PartialType(CreateObtencionDatumDto) {}
