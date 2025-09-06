import { ErrorInitMethod } from "../errors/class_error.js";
export class ClaseRepo {
    constructor() { }
    getID(data) {
        throw new ErrorInitMethod("Favor de declarar la función en la clase principal");
    }
    isExist(data) {
        throw new ErrorInitMethod("Favor de declarar la función en la clase principal");
    }
    isExistById(id) {
        throw new ErrorInitMethod("Favor de declarar la función en la clase principal");
    }
}
