import { ClienteForm } from "../../types/clientes.js";
import { validate_email } from "../../utils.js";
import { EmailDenied, EmptyInfoError } from "../errors/error_info.js";

class ClienteValidator {
    /**
    * Metodo para validar la información que se nos brinda a los contructores de nuestras clases
    */
    public static validate(cliente: ClienteForm): void {
        if (!cliente.nombres.trim()) throw new EmptyInfoError("El nombre no puede estar vacio");
        if (!cliente.apellidos.trim()) throw new EmptyInfoError("Los apellidos no pueden estar vacios");
        if (!cliente.correo.trim()) throw new EmptyInfoError("El correo no puede estar vacio");
        if (!validate_email(cliente.correo)) throw new EmailDenied("El correo no es valido");
        if (!cliente.whatsapp.trim()) throw new EmptyInfoError("El WhatsApp no puede estar vacio");
    }
    
}

export default ClienteValidator