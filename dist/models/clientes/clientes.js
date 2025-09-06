import { ESTATUS_CLIENTE } from "../../types/clientes.js";
import UsuarioAbstract from "../abstract_classes/usuario.js";
import { EmptyInfoError } from "../errors/error_info.js";
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
     * Metodo para validar la información que se nos brinda a los contructores de nuestras clases
     */
    validate() {
        if (!this.nombre.trim())
            throw new EmptyInfoError("El nombre no puede estar vacio");
        if (!this.apellidos.trim())
            throw new EmptyInfoError("Los apellidos no pueden estar vacios");
        this.checkMail();
        if (!this.wpp.trim())
            throw new EmptyInfoError("El WhatsApp no pueden estar vacios");
        if (!Object.values(ESTATUS_CLIENTE).includes(this.estatus))
            throw new EmptyInfoError("No es un estatus valido");
    }
    /**
     * Retorna en un arreglo todos los atributos de la clase
     * @returns [atributos de la clase]
     */
    getAllData() {
        return [this.nombre, this.apellidos, this.correo, this.wpp, this.estatus];
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
