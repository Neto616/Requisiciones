import { ESTATUS_USER, TIPO_USER } from "../../types/usuarios.js";
import UsuarioAbstract from "../abstract_classes/usuario.js";

class Usuario extends UsuarioAbstract{
    constructor(
        public nombre: string,
        public apellidos: string,
        public correo: string,
        public usuario: string,
        private contrasena: string,
    ){
        super(nombre, apellidos, correo);
        console.log("Se ha creado un nuevo objeto: \n"+this.toString());
    }

    public  getContrasena(): string {
        return this.contrasena;
    }

    public toString(): string {
        return `
> Nombre: ${this.nombre}
> Apellidos: ${this.apellidos}
> Correo: ${this.correo}
> Usuario: ${this.usuario}
> Contraseña: ${this.contrasena}
        `;
    }
}

export default Usuario;