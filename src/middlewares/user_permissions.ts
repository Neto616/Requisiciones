import {Request, Response, NextFunction} from "express";
import { TIPO_USER } from "../types/usuarios.js";

export function hasPermission(permited_types: Array<TIPO_USER>) {
    return (req: Request, res: Response, next: NextFunction) => {
        const user_type: TIPO_USER | undefined = req.session.usuario?.tipo;

        if(user_type && permited_types.includes(user_type)) return next();
        
        return res.status(403).json({ estatus: 0, message: "El usuario no tiene permisos"});
    }
}