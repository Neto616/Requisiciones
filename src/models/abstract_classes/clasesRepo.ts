import { ErrorInitMethod } from "../errors/class_error.js";

export abstract class ClaseRepo<T> {
    constructor(){}

    protected getID(data: T): Promise<number>{
        throw new ErrorInitMethod("Favor de declarar la función en la clase principal");
    }

    protected isExist(data: T): Promise<boolean>{
        throw new ErrorInitMethod("Favor de declarar la función en la clase principal");
    }

    protected isExistById(id: number): Promise<boolean>{
        throw new ErrorInitMethod("Favor de declarar la función en la clase principal");
    }
}