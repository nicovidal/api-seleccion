import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { ClienteEvaluado } from 'src/interfaces/datos-evaluadores.interface';
import { CotizacionesCliente, DeudaCliente, Score, Cotizaciones } from 'src/interfaces/interfaces';
import { ObtencionDataService } from 'src/obtencion-data/obtencion-data.service';

@Injectable()
export class EvaluacionService {
  private readonly API_BASE: string;

  constructor(
    private readonly obtencionDataService: ObtencionDataService,
    private readonly configService: ConfigService
  ) {
    this.API_BASE = this.configService.get<string>('API-EVALUADOR');
  }

  async obtencionInformacionEvaluador(rut: string): Promise<ClienteEvaluado> {
    const clienteEvaluado: ClienteEvaluado = {
      rut: '',
      datosEvaluacion: {
        score: 0,
        promedioImponible: 0,
        sumaDeudas: 0,
        lagunasAfp12Meses: 0,
        lagunasAfp6Meses: 0,
      }
    };

    // Obtener información
    const cotizaciones: CotizacionesCliente = await this.obtencionDataService.obtenerCotizacionesCliente(rut);
    const scoreData: Score = await this.obtencionDataService.obtenerScoreCliente(rut);
    const deudaCliente: DeudaCliente = await this.obtencionDataService.obtenerDeudaCliente(rut);

    // Suma total deuda
    const totalDeuda = deudaCliente.deuda.reduce((sum, deuda) => sum + parseFloat(deuda.monto), 0);

    // Promedio imponible
    const totalImponible = cotizaciones.cotizaciones.reduce((suma, imponible) => suma + parseInt(imponible.remuneracionImponible), 0);
    const cantidadCotizaciones = cotizaciones.cotizaciones.length;
    const promedioImponible = cantidadCotizaciones > 0 ? totalImponible / cantidadCotizaciones : 0;

    // Calcular lagunas
    const { lagunas12, lagunas6 } = this.calculoLagunas(cotizaciones.cotizaciones);

    clienteEvaluado.rut = rut;
    clienteEvaluado.datosEvaluacion.score = scoreData.score ?? 0;
    clienteEvaluado.datosEvaluacion.promedioImponible = promedioImponible;
    clienteEvaluado.datosEvaluacion.sumaDeudas = totalDeuda ?? 0;
    clienteEvaluado.datosEvaluacion.lagunasAfp12Meses = lagunas12;
    clienteEvaluado.datosEvaluacion.lagunasAfp6Meses = lagunas6;


    return await this.evaluarCliente(clienteEvaluado);
  }

  async evaluarCliente(clienteEvaluacion: ClienteEvaluado) {
    try {
      const response = await axios.post(`${this.API_BASE}/evaluarCliente`, clienteEvaluacion);
      return response.data;
    } catch (error) {
      throw new Error('Error al evaluar cliente');
    }
  }


  calculoLagunas(cotizaciones: Cotizaciones[]) {
    if (!cotizaciones || cotizaciones.length === 0) {
      return { lagunas12: 12, lagunas6: 6 }; 
    }

    // Obtener fecha actual y calcular los últimos 12 y 6 meses
    const fechaActual = new Date();
    const mesesValidos12 = this.generarUltimosMeses(fechaActual, 12);
    const mesesValidos6 = this.generarUltimosMeses(fechaActual, 6);

    // Convertir cotizaciones a un conjunto para fácil búsqueda
    const mesesCotizados = new Set(cotizaciones.map(c => c.mes));

    // Contar cuántos meses de los últimos 12 y 6 están ausentes
    const lagunas12 = mesesValidos12.filter(mes => !mesesCotizados.has(mes)).length;
    const lagunas6 = mesesValidos6.filter(mes => !mesesCotizados.has(mes)).length;

    return { lagunas12, lagunas6 };
  }


  private generarUltimosMeses(fecha: Date, cantidad: number): string[] {
    const meses: string[] = [];
    for (let i = 0; i < cantidad; i++) {
      const mes = fecha.getMonth() + 1; 
      const anio = fecha.getFullYear();
      meses.push(`${mes.toString().padStart(2, '0')}${anio}`); 
      fecha.setMonth(fecha.getMonth() - 1); 
    }
    return meses;
  }



  async guardarNuevoCliente(clienteEvaluadoAprobado){

    try {
      const response= this.obtencionDataService.guardarNuevoCliente(clienteEvaluadoAprobado);

      return response
    } catch (error) {
      throw new Error('Error al guardar cliente')
    }

  }
}
