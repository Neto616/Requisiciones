import { validate_email } from "../../utils.js";
class UsuarioAbstract {
    nombre;
    apellidos;
    correo;
    constructor(nombre, apellidos, correo) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
    }
    /**
     * getFullName
     *
     * Metodo para obtener el nombre completo de nuestro cliente
     */
    getFullName() {
        return this.nombre.concat(" ", this.apellidos);
    }
    /**
     * checkMail
     */
    checkMail() {
        if (!validate_email(this.correo))
            throw new Error("El correo no tiene el formato correcto");
    }
}
export default UsuarioAbstract;
