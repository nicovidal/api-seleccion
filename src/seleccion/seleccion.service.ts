import { Injectable } from '@nestjs/common';
import { ObtencionDataService } from 'src/obtencion-data/obtencion-data.service';
import { DatosCliente, Deuda, DeudaCliente, TablaRangos } from 'src/interfaces/interfaces';
import { SeleccionFinalResponse } from 'src/interfaces/seleccion-final-response.interaface';


@Injectable()
export class SeleccionService {
  constructor(private readonly obtencionDataService: ObtencionDataService) { }

  async seleccionFinal(rut: string): Promise<SeleccionFinalResponse> {
    const seleccionFinalResponse: SeleccionFinalResponse = {
      cliente: {},
      deuda: '',
      mensaje: '',
      tipoCliente: '',
      elegible: true 
    };
  
    // Obtener tabla de rangos
    const tablaRangos = await this.seleccionTabla();
    const montoDeuda = tablaRangos.maximoDeuda;
    console.log('Monto de deuda:', montoDeuda);
  
    // Obtener deudas del cliente
    const deudasClientes: DeudaCliente[] = await this.seleccionDeuda(rut);
    console.log(JSON.stringify(deudasClientes));
  
    let totalDeuda = 0;
  
    deudasClientes.forEach(cliente => {
      cliente.deuda.forEach(deuda => {
        totalDeuda += Number(deuda.monto) || 0;
      });
    });
  
    console.log(`Total deuda del cliente: ${totalDeuda}`);
  
    // Validar deuda
    if (totalDeuda >= montoDeuda) {
      seleccionFinalResponse.deuda = 'Tiene deuda';
      seleccionFinalResponse.mensaje = 'Rechazado por deuda';
      seleccionFinalResponse.elegible = false; 
      console.log('Cliente con deuda muy alta, no es seleccionado');
      return seleccionFinalResponse; 
    } 
  
    seleccionFinalResponse.deuda = 'No tiene deuda';
  
    // 3. Consulta tipo de cliente
    const tipoCliente = await this.seleccionTipo(rut);
    const isPolitico = tablaRangos.politico;
    const isDelincuente = tablaRangos.delincuente;
    console.log(isPolitico);
  
    //politico
    if (tipoCliente.politico === isPolitico) {
      seleccionFinalResponse.mensaje = 'Rechazado no se permiten políticos';
      seleccionFinalResponse.elegible = false;
      console.log('Cliente no es elegible por tipo');
      return seleccionFinalResponse; 
    }
  
    //delincuente
    if (tipoCliente.delincuente === isDelincuente) {
      seleccionFinalResponse.mensaje = 'Rechazado por ser delincuente';
      seleccionFinalResponse.elegible = false;
      console.log('Cliente no es elegible por tipo (delincuente)');
      return seleccionFinalResponse; 
    }
  
    const datosCliente: DatosCliente = await this.seleccionCliente(rut);
    seleccionFinalResponse.cliente = { ...datosCliente };
  
    // Aquí podrías agregar más validaciones que también puedan cambiar `elegible` a false
  
    seleccionFinalResponse.tipoCliente = 'Pasa las políticas de tipo'; 
  
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
      const clienteDatos = await this.obtencionDataService.obtenerDeudaCliente(rut);

      if (clienteDatos && Array.isArray(clienteDatos.deuda)) {
      
        return [{
          rut: clienteDatos.rut,  
          deuda: clienteDatos.deuda  
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
