class Requisiciones {
    numero_control;
    elaboro_id;
    cliente_id;
    revisa_id;
    autoriza_id;
    solicitud;
    suministro;
    obra;
    costo;
    numero_orden;
    constructor(numero_control, elaboro_id, cliente_id, revisa_id, autoriza_id, solicitud, suministro, obra, costo, numero_orden) {
        this.numero_control = numero_control;
        this.elaboro_id = elaboro_id;
        this.cliente_id = cliente_id;
        this.revisa_id = revisa_id;
        this.autoriza_id = autoriza_id;
        this.solicitud = solicitud;
        this.suministro = suministro;
        this.obra = obra;
        this.costo = costo;
        this.numero_orden = numero_orden;
    }
    toString() {
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
        `;
    }
}
export default Requisiciones;
