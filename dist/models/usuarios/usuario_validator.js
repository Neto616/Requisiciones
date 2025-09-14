import { TIPO_USER } from "../../types/usuarios.js";
import { validate_email } from "../../utils.js";
import { EmptyInfoError, ErrorTypeData, PassworDenied } from "../errors/error_info.js";
class UsuarioValidator {
    static validate(usuario) {
        console.log(usuario.tipo);
        const enum_value = Object.values(TIPO_USER).filter(v => typeof v === "number");
        const user_password = usuario.contrasena;
        if (!usuario)
            throw new EmptyInfoError("Se necesita que ingrese la información del usuario");
        if (!usuario.nombres || !usuario.nombres.trim())
            throw new EmptyInfoError("El nombre no puede estar vacio");
        if (!usuario.apellidos || !usuario.apellidos.trim())
            throw new EmptyInfoError("Los apellidos no pueden estar vacios");
        if (!usuario.usuario || !usuario.usuario.trim())
            throw new EmptyInfoError("El nombre de usuario no puede estar vacio");
        if (!usuario.correo || !usuario.correo.trim())
            throw new EmptyInfoError("El correo no puede estar vacío");
        if (!validate_email(usuario.correo))
            throw new ErrorTypeData("El correo no tiene el formato correcto");
        if (!user_password || !user_password.trim())
            throw new EmptyInfoError("La contraseña no puede estar vacía");
        if (user_password.length < 8)
            throw new PassworDenied("La contraseña debe contener ocho o más digitos");
        if (!usuario.tipo || !Object.values(TIPO_USER).includes(Number(usuario.tipo)))
            throw new EmptyInfoError("Tipo de usuario no valido");
    }
}
export default UsuarioValidator;
