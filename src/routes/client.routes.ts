import { Router, Request, Response } from "express";
import ClienteController from "../models/clientes/cliente_controller.js";
import { ClienteService } from "../models/clientes/cliente_service.js";
import { ClienteRepository } from "../models/clientes/clientes_repository.js";
import DBPostgre from "../config/db.js";

const router = Router();

const db: DBPostgre =  new DBPostgre();
const client_repo: ClienteRepository =  new ClienteRepository(db);
const client_service: ClienteService = new ClienteService(client_repo);
const client_controller: ClienteController = new ClienteController(client_service);

router.get("/clientes", [], async (req: Request, res: Response) => await client_controller.getAll(req, res));
router.get("/cliente/:id", [], async (req: Request, res: Response) => await client_controller.getInfo(req, res));
router.post("/cliente", [], async (req: Request, res: Response) => await client_controller.crear(req, res));
router.put("/cliente/:id", [] ,async (req: Request, res: Response) => await client_controller.actualizar(req, res));
router.delete("/cliente/:id", [], async (req: Request, res: Response) => await client_controller.eliminar(req, res));

export default router;