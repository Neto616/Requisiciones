import { ESTATUS_REQUISICIONES } from "../../types/requisiciones.js";

class Requisiciones {
    constructor(
        public numero_control: string,
        public elaboro_id: number,
        public cliente_id: number,
        public revisa_id: number,
        public autoriza_id: number,
        public solicitud: number,
        public suministro: number,
        public obra: string,
        public costo?: number,
        public numero_orden?: string
    ){}

    public toString(): string {
        return `
> Número de control: ${this.numero_control}
> ID elaboro: ${this.elaboro_id}
> ID cliente: ${this.cliente_id}
> ID revisa: ${this.revisa_id}
> ID autoriza: ${this.autoriza_id}
> Solicitud: ${this.solicitud}
> Suministro: ${this.suministro}
> Obra: ${this.obra}
> Costo: ${this.costo ?? 0.00}
> Número de orden: ${this.numero_orden}
        `
    }
}

export default Requisiciones;