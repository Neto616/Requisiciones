import { ESTATUS_CLIENTE } from "../../types/clientes.js";
import UsuarioAbstract from "../abstract_classes/usuario.js";
import { EmptyInfoError } from "../errors/error_info.js";

class Cliente extends UsuarioAbstract{
    constructor(
        public nombre: string,
        public apellidos: string,
        public correo: string,
        public wpp: string,
        public estatus: ESTATUS_CLIENTE = ESTATUS_CLIENTE.ACTIVO
    ){
        super(nombre, apellidos, correo);
    }

    /**
     * toString
     */
    public toString(): string {
        return `
Cliente:
> Nombre: ${this.nombre}
> Apellidos: ${this.apellidos}
> Correo: ${this.correo}
> Wpp: ${this.wpp}
> Estatus: ${this.estatus}
        `       
    }
}

export default Cliente