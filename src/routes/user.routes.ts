import { Router, Request, Response } from "express";
import UsuarioController from "../models/usuarios/usuario_controllers.js";
import UsuarioService from "../models/usuarios/usuario_service.js";
import UsuarioRepository from "../models/usuarios/usuarios_repository.js";
import DBPostgre from "../config/db.js";
import { hasPermission } from "../middlewares/user_permissions.js";
import { TIPO_USER } from "../types/usuarios.js";

const db = new DBPostgre();
const user_repo  = new UsuarioRepository(db);
const user_service = new UsuarioService(user_repo);
const user_controller = new UsuarioController(user_service);

const router: Router = Router();
// hasPermission([TIPO_USER.ADMIN])
router.get("/usuarios", [], async (req: Request, res: Response) => await user_controller.getAll(req, res));
router.get("/usuario/:id", [], async (req: Request, res: Response) => await user_controller.getInfo(req, res));
router.post("/usuario", [], async(req: Request, res: Response) => await user_controller.crear(req, res));
router.put("/usuario/:id", [hasPermission([TIPO_USER.ADMIN])], async (req: Request, res: Response) => await user_controller.actualizar(req, res));
router.delete("/usuario/:id", [], async (req: Request, res: Response) => await user_controller.eliminar(req, res));

export default router;