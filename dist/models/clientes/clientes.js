import { ESTATUS_CLIENTE } from "../../types/clientes.js";
import UsuarioAbstract from "../abstract_classes/usuario.js";
class Cliente extends UsuarioAbstract {
    nombre;
    apellidos;
    correo;
    wpp;
    estatus;
    constructor(nombre, apellidos, correo, wpp, estatus = ESTATUS_CLIENTE.ACTIVO) {
        super(nombre, apellidos, correo);
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.wpp = wpp;
        this.estatus = estatus;
    }
    /**
     * toString
     */
    toString() {
        return `
Cliente:
> Nombre: ${this.nombre}
> Apellidos: ${this.apellidos}
> Correo: ${this.correo}
> Wpp: ${this.wpp}
> Estatus: ${this.estatus}
        `;
    }
}
export default Cliente;
