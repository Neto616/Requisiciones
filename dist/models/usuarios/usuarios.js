import UsuarioAbstract from "../abstract_classes/usuario.js";
class Usuario extends UsuarioAbstract {
    nombre;
    apellidos;
    correo;
    usuario;
    contrasena;
    constructor(nombre, apellidos, correo, usuario, contrasena) {
        super(nombre, apellidos, correo);
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.correo = correo;
        this.usuario = usuario;
        this.contrasena = contrasena;
        console.log("Se ha creado un nuevo objeto: \n" + this.toString());
    }
    getContrasena() {
        return this.contrasena;
    }
    toString() {
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
