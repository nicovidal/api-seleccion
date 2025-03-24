import { Injectable } from '@nestjs/common';
import { ClienteEvaluado} from 'src/interfaces/datos-evaluadores.interface';
import { DeudaCliente, Score } from 'src/interfaces/interfaces';
import { ObtencionDataService } from 'src/obtencion-data/obtencion-data.service';


@Injectable()
export class EvaluacionService {

  constructor(private readonly obtencionDataService: ObtencionDataService) { }

  async obtencionInformacionEvaluador(rut:string):Promise<ClienteEvaluado>
  {
    const clienteEvaluado: ClienteEvaluado = {
      rut: '',
      datosEvaluacion: {
          score: 0,
          promedioImponible: 0,
          sumaDeudas: 0
      }
  };
    //obtencion de informacion.
    const cotizaciones=this.obtencionDataService.obtenerCotizacionesCliente(rut);
    const scoreData: Score = await this.obtencionDataService.obtenerScoreCliente(rut);
    const deudaCliente: DeudaCliente=await this.obtencionDataService.obtenerDeudaCliente(rut);

    //suma total deuda

    const totalDeuda = deudaCliente.deuda.reduce((sum, deuda) => sum + parseFloat(deuda.monto), 0);

  clienteEvaluado.rut=rut;
  clienteEvaluado.datosEvaluacion.score= scoreData.score ?? 0;

  clienteEvaluado.datosEvaluacion.sumaDeudas=totalDeuda??0;


    return clienteEvaluado;
  }


}
