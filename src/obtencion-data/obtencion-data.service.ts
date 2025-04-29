import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { CotizacionesCliente, DatosCliente, DeudaCliente, Score, TablaRangos, TipoPersona } from 'src/interfaces/interfaces';

@Injectable()
export class ObtencionDataService {
  private readonly API_BASE: string;

  constructor(
    private readonly configService: ConfigService
  ) {
    this.API_BASE = this.configService.get<string>('MS-OBTENCION-DATA');
  }

  async obtenerCotizacionesCliente(rut: string): Promise<CotizacionesCliente> {
    try {
      console.log(`[INFO] Solicitando cotizaciones para RUT: ${rut}`);

      const response = await axios.get(`${this.API_BASE}/cotizacionesRut?rut=${rut}`);
      console.log(`[INFO] Respuesta de la API recibida:`, response.data);

      const cotizacionesCliente = response.data;

      if (cotizacionesCliente?.ok === false) {
        console.warn(`[WARNING] Cliente ${rut} no tiene cotizaciones.`);
        return { rut, cotizaciones: [] };
      }

      return {
        rut: cotizacionesCliente.rut ?? rut,
        cotizaciones: cotizacionesCliente.cotizaciones ?? []
      };

    } catch (error) {
      console.error(`[ERROR] Fallo al obtener cotizaciones para RUT ${rut}:`, error.message);

      throw new HttpException(`Error obteniendo cotizaciones del cliente: ${error.message}`, HttpStatus.BAD_GATEWAY);
    }
  }


  async obtenerDatosCliente(rut: string): Promise<DatosCliente> {
    try {
      const response = await axios.get(`${this.API_BASE}/personaRut?rut=${rut}`);
      console.log('Cliente encontrado');
      return response.data;
    } catch (error) {
      throw new HttpException('Error obteniendo datos del cliente', HttpStatus.BAD_GATEWAY);
    }
  }


  async obtenerDeudaCliente(rut: string): Promise<DeudaCliente> {
    try {

      const response = await axios.get(`${this.API_BASE}/deudaRut?rut=${rut}`);
      console.log('Deuda cliente obtenida');

      return {
        rut: rut,
        deuda: response.data.deuda
      };
    } catch (error) {
      throw new HttpException('Error obteniendo deuda del cliente', HttpStatus.BAD_GATEWAY);
    }
  }

  async obtenerTipoCliente(rut: string): Promise<TipoPersona> {
    try {
      const response = await axios.get(`${this.API_BASE}/tipoRut?rut=${rut}`);
      console.log('Tipo de cliente obtenido');
      return response.data;
    } catch (error) {
      throw new HttpException('Error obteniendo tipo del cliente', HttpStatus.BAD_GATEWAY);
    }
  }

  async obtenerScoreCliente(rut: string): Promise<Score> {
    try {
      const response = await axios.get(`${this.API_BASE}/scoreRut?rut=${rut}`);
      console.log('Score del cliente obtenido');
      return response.data;
    } catch (error) {
      throw new HttpException('Error obteniendo score del cliente', HttpStatus.BAD_GATEWAY);
    }
  }


  async obtenerTablaRangos(): Promise<TablaRangos> {

    try {

      const response = await axios.get(`${this.API_BASE}/tablaRangos`);
      console.log('Tabla rangos obtenida')
      return response.data
    } catch (error) {
      throw new HttpException('Error obteniendo tabla rangos', HttpStatus.BAD_GATEWAY);

    }
  }

  async obtenerOfertasCliente(rut: string) {
    try {

      const response = await axios.get(`${this.API_BASE}/ofertaRut?rut=${rut}`)

      return response.data;
    } catch (error) {
      throw new HttpException('Error obteniendo oferta', HttpStatus.BAD_GATEWAY);
    }
  }


}
