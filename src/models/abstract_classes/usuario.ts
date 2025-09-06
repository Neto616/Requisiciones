import { validate_email } from "../../utils.js";

abstract class UsuarioAbstract {
    constructor(
        public nombre: string,
        public apellidos: string,
        public correo: string
    ){}

    /**
     * getFullName
     * 
     * Metodo para obtener el nombre completo de nuestro cliente
     */
    public getFullName(): string {
        return this.nombre.concat(" ", this.apellidos);
    }
}

export default UsuarioAbstract;