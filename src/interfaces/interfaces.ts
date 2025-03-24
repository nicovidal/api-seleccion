export interface CotizacionesCliente{
  rut?:string;
  cotizaciones:Cotizaciones[]

}

export interface Cotizaciones {
  mes: string;
  remuneracionImponible: string;
  afp: string;
}

export interface DatosCliente{
  rut?:string;
  nombreCompleto?:string;
  apellidoPatero?:string;
  apellidoMatero?:string;
  nombres?:string;
}



export interface Score{

  rut?:string;
  score?:number;
}


export interface TipoPersona{
  rut?:string;
  politico?:string;
  delincuente?:string;
}



  export interface DeudaCliente {
    rut: string;  
    deuda: Deuda[];  
  
  }

  export interface Deuda {
    nombreInstitucion: string;
    monto: string;
    fecha: Date;
  }
  
  export interface TablaRangos {
    maximoDeuda?: number;
    politico?: string;
    delincuente?: string;
    scoreMaximo?: number;
}
