import { TIPO_USER } from "../../types/usuarios.js";
import { EmptyInfoError, PassworDenied } from "../errors/error_info.js";
class UsuarioValidator {
    static validate(usuario) {
        const user_password = usuario.contrasena;
        if (!usuario.nombres.trim())
            throw new EmptyInfoError("El nombre no puede estar vacio");
        if (!usuario.apellidos.trim())
            throw new EmptyInfoError("Los apellidos no pueden estar vacios");
        if (!usuario.usuario.trim())
            throw new EmptyInfoError("El nombre de usuario no peude estar vacio");
        if (!user_password.trim())
            throw new EmptyInfoError("La contraseña no puede estar vacía");
        if (user_password.length < 8)
            throw new PassworDenied("La contraseña debe contener ocho o más digitos");
        if (!Object.values(TIPO_USER).includes(usuario.tipo))
            throw new EmptyInfoError("Tipo de usuario no valido");
    }
}
export default UsuarioValidator;
