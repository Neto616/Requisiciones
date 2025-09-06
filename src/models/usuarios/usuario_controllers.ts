import { Request, Response } from "express";
import { IUserController } from "../interfaces/user/interface_user_controller.js";

class UsuarioController implements IUserController {
    constructor(){}

    async crear(req: Request, res: Response): Promise<Response> {
        const body = req.body;
        return res.status(200);
    }

    async actualizar(req: Request, res: Response): Promise<Response> {
        return res.status(200);
    }

    async eliminar(req: Request, res: Response): Promise<Response> {
        return res.status(200);
    }

    async getAll(req: Request, res: Response): Promise<Response> {
        return res.status(200);
    }

    async getInfo(req: Request, res: Response): Promise<Response> {
        return res.status(200);
    }
}