import { Injectable } from '@nestjs/common';
import { ObtencionDataService } from 'src/obtencion-data/obtencion-data.service';


interface SeleccionFinalResponse {
  cliente?: any;
  deuda?: any;
  mensaje?: string;
  elegible?: boolean;
}


@Injectable()
export class SeleccionService {

  constructor(private readonly obtencionDataService: ObtencionDataService) { }


  async seleccionFinal(rut: string) {

    const seleccionFinalResponse: SeleccionFinalResponse = {};

    this.seleccionCliente(rut)


    const deudaCliente = await this.seleccionDeuda(rut)

    if (deudaCliente) {
      throw new Error('Cliente con deuda , no puede optar a tarjeta')
    }

    seleccionFinalResponse.deuda='No tiene deuda'

    return seleccionFinalResponse;
  }



  async seleccionCliente(rut: string) {
    try {
      const clienteDatos = await this.obtencionDataService.obtenerDatosCliente(rut);
      console.log('Datos del cliente:', clienteDatos);
      return clienteDatos;
    } catch (error) {
      throw new Error('Error al obtener datos del cliente');
    }
  }

  async seleccionDeuda(rut: string) {
    try {
      const clienteDatos = await this.obtencionDataService.obtenerDeudaCliente(rut);
      console.log('Datos de deuda:', clienteDatos);
      return clienteDatos;
    } catch (error) {
      throw new Error('Error al obtener deudas datos del cliente');
    }
  }





}
