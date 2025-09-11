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
}
export default UsuarioAbstract;
