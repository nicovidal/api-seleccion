import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ObtencionDataService } from './obtencion-data.service';
import { CreateObtencionDatumDto } from './dto/create-obtencion-datum.dto';
import { UpdateObtencionDatumDto } from './dto/update-obtencion-datum.dto';

@Controller('obtencion-data')
export class ObtencionDataController {
  constructor(private readonly obtencionDataService: ObtencionDataService) {}

/*   @Post()
  create(@Body() createObtencionDatumDto: CreateObtencionDatumDto) {
    return this.obtencionDataService.create(createObtencionDatumDto);
  }
 */

  @Get('/buscarCliente')
  findAll(@Query('rut') rut: string) {
    return this.obtencionDataService.obtenerDatosCliente(rut);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.obtencionDataService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateObtencionDatumDto: UpdateObtencionDatumDto) {
    return this.obtencionDataService.update(+id, updateObtencionDatumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.obtencionDataService.remove(+id);
  }
}
