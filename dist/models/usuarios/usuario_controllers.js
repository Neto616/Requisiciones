import { ESTATUS_RESPONSE, MSG_RESPONSE } from "../../types/general.js";
import { EmptyInfoError, ErrorTypeData, ErrorUserExists, ErrorUserNotExist, PassworDenied } from "../errors/error_info.js";
class UsuarioController {
    user_service;
    constructor(user_service) {
        this.user_service = user_service;
    }
    async crear(req, res) {
        try {
            const body = req.body;
            await this.user_service.crear(body);
            return res.status(200).json({
                estatus: ESTATUS_RESPONSE.SUCCESS
            });
        }
        catch (error) {
            if (error instanceof ErrorTypeData)
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.ERROR,
                    message: error.message
                });
            if (error instanceof PassworDenied || error instanceof EmptyInfoError)
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.ERROR,
                    message: error.message
                });
            if (error instanceof ErrorUserExists)
                return res.status(409).json({
                    estatus: ESTATUS_RESPONSE.ALREADY_EXISTS,
                    message: MSG_RESPONSE.ALREADY_EXISTS
                });
            return res.status(500).json({
                estatus: ESTATUS_RESPONSE.ERROR,
                message: MSG_RESPONSE.SERVER_ERROR
            });
        }
    }
    async actualizar(req, res) {
        try {
            const { id } = req.params;
            const body = req.body;
            if (!id || isNaN(Number(id)))
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.EMPTY_INFO,
                    message: MSG_RESPONSE.INVALID_ID
                });
            if (!Object.keys(body).length)
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.ERROR,
                    message: "No se entrego la información con la que se actualizaran los datos."
                });
            const id_format = Number(id);
            await this.user_service.actualizar(id_format, body, body.estatus);
            return res.status(204).end();
        }
        catch (error) {
            if (error instanceof PassworDenied || error instanceof EmptyInfoError)
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.ERROR,
                    message: error.message
                });
            if (error instanceof ErrorUserNotExist)
                return res.status(404).json({
                    estatus: ESTATUS_RESPONSE.NOT_FOUND,
                    message: MSG_RESPONSE.NOT_FOUND
                });
            return res.status(500).json({
                estatus: ESTATUS_RESPONSE.ERROR,
                message: MSG_RESPONSE.SERVER_ERROR
            });
        }
    }
    async eliminar(req, res) {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id)))
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.EMPTY_INFO,
                    message: MSG_RESPONSE.INVALID_ID
                });
            const id_format = Number(id);
            await this.user_service.eliminar(id_format);
            return res.status(204).end();
        }
        catch (error) {
            if (error instanceof ErrorUserNotExist)
                return res.status(404).json({
                    estatus: ESTATUS_RESPONSE.NOT_FOUND,
                    message: MSG_RESPONSE.NOT_FOUND
                });
            return res.status(500).json({
                estatus: ESTATUS_RESPONSE.ERROR,
                message: MSG_RESPONSE.SERVER_ERROR
            });
        }
    }
    async getAll(req, res) {
        try {
            const list_all_user = await this.user_service.getAllInfo();
            return res.status(200).json({
                estatus: ESTATUS_RESPONSE.SUCCESS,
                users_list: list_all_user
            });
        }
        catch (error) {
            return res.status(500).json({
                estatus: ESTATUS_RESPONSE.ERROR,
                message: MSG_RESPONSE.SERVER_ERROR
            });
        }
    }
    async getInfo(req, res) {
        try {
            const { id } = req.params;
            if (!id || isNaN(Number(id)))
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.EMPTY_INFO,
                    message: MSG_RESPONSE.INVALID_ID
                });
            const id_format = Number(id);
            const user_info = (await this.user_service.getInfo(id_format))[0];
            if (!user_info)
                return res.status(404).json({
                    estatus: ESTATUS_RESPONSE.NOT_FOUND,
                    message: MSG_RESPONSE.NOT_FOUND
                });
            return res.status(200).json({
                estatus: ESTATUS_RESPONSE.SUCCESS,
                user_info: user_info
            });
        }
        catch (error) {
            return res.status(500).json({
                estatus: ESTATUS_RESPONSE.ERROR,
                message: MSG_RESPONSE.SERVER_ERROR
            });
        }
    }
}
export default UsuarioController;
