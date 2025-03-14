import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateObtencionDatumDto } from './dto/update-obtencion-datum.dto';
import { HttpService } from '@nestjs/axios';
import axios from 'axios';


@Injectable()
export class ObtencionDataService {

  private readonly API_BASE = 'http://localhost:8080/api/data/personaRut';

  constructor(private readonly httpService:HttpService){}


  async obtenerDatosCliente(rut: string) {
    try {

      const response = await axios.get(`${this.API_BASE}?rut=${rut}`);
      console.log('cliente encontrado')
      return response.data;
    } catch (error) {
      throw new HttpException('Error obteniendo datos del cliente', HttpStatus.BAD_GATEWAY);
    }
  }

  async obtenerDeudaCliente(rut:string){
    try {
      
      const response=await axios.get(`${this.API_BASE}?rut=${rut}`);
      console.log('Deuda cliente obtenida')
      return response.data

    } catch (error) {
      throw new HttpException('Error obteniendo deuda del cliente', HttpStatus.BAD_GATEWAY);

    }
  }

  findAll() {
    return `This action returns all obtencionData`;
  }

  findOne(id: number) {
    return `This action returns a #${id} obtencionDatum`;
  }

  update(id: number, updateObtencionDatumDto: UpdateObtencionDatumDto) {
    return `This action updates a #${id} obtencionDatum`;
  }

  remove(id: number) {
    return `This action removes a #${id} obtencionDatum`;
  }
}
