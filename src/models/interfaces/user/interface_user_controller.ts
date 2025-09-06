import { Request, Response } from "express"

export interface IUserController {
    crear(req: Request, res: Response): Promise<Response>;
    actualizar(req: Request, res: Response): Promise<Response>;
    eliminar(req: Request, res: Response): Promise<Response>;
    getAll(req: Request, res: Response): Promise<Response>;
    getInfo(req: Request, res: Response): Promise<Response>;
};