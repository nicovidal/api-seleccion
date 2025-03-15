import { Injectable } from '@nestjs/common';
import { ObtencionDataService } from 'src/obtencion-data/obtencion-data.service';

@Injectable()
export class SeleccionService {

  constructor(private readonly obtencionDataService: ObtencionDataService) {} 

  async seleccionCliente(rut: string) {
    try {
      const clienteDatos = await this.obtencionDataService.obtenerDatosCliente(rut);
      console.log('Datos del cliente:', clienteDatos);
      return clienteDatos;
    } catch (error) {
      throw new Error('Error al obtener datos del cliente');
    }
  }
}
