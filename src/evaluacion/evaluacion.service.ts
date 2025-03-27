import { Injectable, Post } from '@nestjs/common';
import axios from 'axios';

import { ConfigService } from '@nestjs/config';
import { ClienteEvaluado } from 'src/interfaces/datos-evaluadores.interface';
import { DeudaCliente, Score } from 'src/interfaces/interfaces';
import { ObtencionDataService } from 'src/obtencion-data/obtencion-data.service';


@Injectable()
export class EvaluacionService {
  private readonly API_BASE: string;
  constructor(private readonly obtencionDataService: ObtencionDataService,
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
        sumaDeudas: 0
      }
    };
    //obtencion de informacion.
    const cotizaciones = this.obtencionDataService.obtenerCotizacionesCliente(rut);
    const scoreData: Score = await this.obtencionDataService.obtenerScoreCliente(rut);
    const deudaCliente: DeudaCliente = await this.obtencionDataService.obtenerDeudaCliente(rut);

    //suma total deuda

    const totalDeuda = deudaCliente.deuda.reduce((sum, deuda) => sum + parseFloat(deuda.monto), 0);

    clienteEvaluado.rut = rut;
    clienteEvaluado.datosEvaluacion.score = scoreData.score ?? 0;

    clienteEvaluado.datosEvaluacion.sumaDeudas = totalDeuda ?? 0;

    const evaluado=await this.evaluarCliente(clienteEvaluado);


    return evaluado;
  }


  async evaluarCliente(clienteEvaluacion:{}){

    try {

      const response=await axios.post(`${this.API_BASE}/evaluarCliente`,clienteEvaluacion)
      const clienteEvaluado=response.data;
    
      return clienteEvaluado
    } catch (error) {
      
      throw new Error('Error al evaluar cliente')
    }

  }


}
