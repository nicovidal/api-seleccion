import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import { Deuda, DeudaCliente, TablaRangos } from 'src/interfaces/interfaces';

@Injectable()
export class ObtencionDataService {
  private readonly API_BASE: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService
  ) {
    this.API_BASE = this.configService.get<string>('MS-OBTENCION-DATA');
  }

  async obtenerDatosCliente(rut: string) {
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
  
  async obtenerTipoCliente(rut: string) {
    try {
      const response = await axios.get(`${this.API_BASE}/tipoRut?rut=${rut}`);
      console.log('Tipo de cliente obtenido');
      return response.data;
    } catch (error) {
      throw new HttpException('Error obteniendo tipo del cliente', HttpStatus.BAD_GATEWAY);
    }
  }

  async obtenerScoreCliente(rut: string) {
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


}
