import { ESTATUS_REQUISICIONES, RequisicionesForm } from "../../types/requisiciones.js";
import { ErrorData, ErrorTypeData } from "../errors/error_info.js";

class RequisicionValidator {
    constructor(){}

    public isValidId(numero: number): boolean {
        return !isNaN(numero) || numero > 0;
    }

    public static validate(requisicion: RequisicionesForm): void {
        const validator: RequisicionValidator = new RequisicionValidator();
        // Revisión del numero de control de la requisicion
        const regex_nc: RegExp = /^"RE-(0[1-9]|[12][0-9]|3[01])(0[1-9]|1[0-2])\d{2}-\d{2,}"$/;
        if(!requisicion.numero_control.match(regex_nc)) throw new ErrorData("El formato del número de control no es valido");

        // Revisión del identificador del usuario que elaboro
        if(!validator.isValidId(requisicion.elaboro_id)) throw new ErrorTypeData("El identificador del usaurio que elabora debe ser númerico o mayor que cero");
        
        // Revisión del identificador del cliente
        if(!validator.isValidId(requisicion.cliente_id)) throw new ErrorTypeData("El identificador del cliente debe ser númerico o mayor que cero");
        
        // Revisión del identificador del usuario que autoriza
        if(!validator.isValidId(requisicion.autoriza_id)) throw new ErrorTypeData("El identificador del usuario que autoriza debe ser númerico o mayor que cero");

        // Revisión de la solicitud
        if(!requisicion.solicitud) throw new ErrorTypeData("La solicitud no puede tener un valor de vacío");

        // Revisión del suministro
        if(!requisicion.suministro) throw new ErrorTypeData("El suministro no puede tener un valor de vacío");

        // Revisión de la obra
        if(!requisicion.obra) throw new ErrorTypeData("La obra no puede tener un valor de vacío");
        // Revisión del costo

        if(requisicion.costo){
            // Si el costo tiene algun valor aquí estarán sus datos
            if(isNaN(requisicion.costo)) throw new ErrorTypeData("El costo debe ser de tipo númerico");
            if(requisicion.costo < 0) throw new ErrorData("El costo no puede tener un valor negativo");
        }

        // Revisión del numero de orden

        if(requisicion.numero_orden){
            //  TODO: Validar formato de número de orden si aplica
        }

        // Revisión del estatus de la requisición
        if(!(Object.values(ESTATUS_REQUISICIONES).includes(requisicion.estatus))) throw new ErrorTypeData("Estatus no valido");
    }
}

export default RequisicionValidator;