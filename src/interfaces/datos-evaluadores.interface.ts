export interface ClienteEvaluado {
    rut?: string;
    datosEvaluacion: datosEvaluadores;
}

export interface datosEvaluadores {
    score: number;
    promedioImponible: number;
    sumaDeudas: number;
    lagunasAfp12Meses:number;
    lagunasAfp6Meses:number;
}
