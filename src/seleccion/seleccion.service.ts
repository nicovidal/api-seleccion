import { Injectable } from '@nestjs/common';
import { ObtencionDataService } from 'src/obtencion-data/obtencion-data.service';
import { SeleccionFinalResponse } from '../interfaces/seleccion-final-response.interaface';
import { Deuda, DeudaCliente, TablaRangos } from 'src/interfaces/interfaces';


@Injectable()
export class SeleccionService {
  constructor(private readonly obtencionDataService: ObtencionDataService) { }

  async seleccionFinal(rut: string): Promise<SeleccionFinalResponse> {
    const seleccionFinalResponse: SeleccionFinalResponse = {
      cliente: {},
      deuda: '',
      mensaje: '',
      tipoCliente: '',
      elegible: false
    };

    // Obtener tabla de rangos
    const tablaRangos = await this.seleccionTabla();

    // Obtener datos del cliente
    const datosCliente = await this.seleccionCliente(rut);
    seleccionFinalResponse.cliente = { nombre: datosCliente };

    const deudasClientes: DeudaCliente[] = await this.seleccionDeuda(rut);

    console.log(JSON.stringify(deudasClientes));

    let totalDeuda = 0;

    // Recorrer cada cliente en deudasClientes
    deudasClientes.forEach(cliente => {
      
      cliente.deuda.forEach(deuda => {
        totalDeuda += Number(deuda.monto) || 0; 
      });
    });

    console.log(`Total deuda del cliente: ${totalDeuda}`);

    if (totalDeuda >= tablaRangos.maximoDeuda) {
  
      console.log('Cliente con deuda muy alta, no es seleccionado');
    }




    seleccionFinalResponse.deuda = 'No tiene deuda';


    // 3. Consulta tipo de cliente
    const tipoCliente = await this.seleccionTipo(rut);

    seleccionFinalResponse.tipoCliente = 'pasa las politicas de tipo'



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

  async seleccionDeuda(rut: string): Promise<DeudaCliente[]> {
    try {
      // Llamada al servicio para obtener la deuda
      const clienteDatos = await this.obtencionDataService.obtenerDeudaCliente(rut);

      // Verifica si la propiedad 'deuda' es un arreglo
      if (clienteDatos && Array.isArray(clienteDatos.deuda)) {
        // Aquí es donde puedes obtener el 'rut' de clienteDatos si está presente
        return [{
          rut: clienteDatos.rut,  // Esto debería funcionar si rut está presente
          deuda: clienteDatos.deuda  // La propiedad deuda es el arreglo de deudas
        }];
      } else {
        throw new Error('La propiedad deuda no es un arreglo válido');
      }
    } catch (error) {
      throw new Error('Error al obtener deudas del cliente');
    }
  }

  async seleccionTipo(rut: string) {
    try {
      const clienteTipoDatos = await this.obtencionDataService.obtenerTipoCliente(rut);
      console.log('Tipo de cliente obtenido', clienteTipoDatos);
      return clienteTipoDatos;
    } catch (error) {
      throw new Error('Error al obtener tipo de cliente');
    }
  }


  async seleccionTabla(): Promise<TablaRangos> {
    try {

      const tablaRangosDatos = await this.obtencionDataService.obtenerTablaRangos();
      console.log('Obtener tabla de rangos');

      return tablaRangosDatos;

    } catch (error) {

      throw new Error('Error al obtener tipo de cliente');


    }
  }
}
