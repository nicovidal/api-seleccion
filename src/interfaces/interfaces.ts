export interface TablaRangos {
    maximoDeuda?: number;
    politico?: string;
    delincuente?: string;
    scoreMaximo?: number;
}


export interface Deuda {
    nombreInstitucion: string;
    monto: string;
    fecha: Date;
  }
  
  export interface DeudaCliente {
    rut: string;  
    deuda: Deuda[];  
  
  }