import { ESTATUS_RESPONSE, MSG_RESPONSE } from "../../types/general.js";
import { ErrorFinding } from "../errors/class_error.js";
import { validate_users_id } from "../../utils.js";
import { EmailDenied, EmptyInfoError, ErrorClientExists } from "../errors/error_info.js";
class ClienteController {
    service;
    constructor(service) {
        this.service = service;
    }
    async crear(req, res) {
        try {
            const body = req.body;
            await this.service.crear(body);
            return res.status(200).json({
                estatus: ESTATUS_RESPONSE.SUCCESS
            });
        }
        catch (error) {
            if (error instanceof ErrorClientExists)
                return res.status(409).json({
                    estatus: ESTATUS_RESPONSE.ALREADY_EXISTS,
                    message: MSG_RESPONSE.ALREADY_EXISTS
                });
            if (error instanceof EmptyInfoError)
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.EMPTY_INFO,
                    message: error.message
                });
            if (error instanceof EmailDenied)
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.ERROR,
                    message: error.message
                });
            return res.status(500).json({
                estatus: ESTATUS_RESPONSE.ERROR,
                message: MSG_RESPONSE.SERVER_ERROR
            });
        }
    }
    async actualizar(req, res) {
        try {
            const body = req.body;
            const { id } = req.params;
            if (!validate_users_id(id))
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.ERROR,
                    message: MSG_RESPONSE.INVALID_ID
                });
            if (Object.keys(body).length)
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.ERROR,
                    message: "No se entrego la información con la que se actualizaran los datos."
                });
            const id_format = Number(id);
            await this.service.actualizar(id_format, body);
            return res.status(204).end();
        }
        catch (error) {
            if (error instanceof EmptyInfoError)
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.EMPTY_INFO,
                    message: error.message
                });
            if (error instanceof EmailDenied)
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.ERROR,
                    message: error.message
                });
            if (error instanceof ErrorFinding)
                return res.status(404).json({
                    estatus: ESTATUS_RESPONSE.ALREADY_EXISTS,
                    message: MSG_RESPONSE.ALREADY_EXISTS
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
            if (!validate_users_id(id))
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.ERROR,
                    message: MSG_RESPONSE.INVALID_ID
                });
            const id_format = Number(id);
            await this.service.eliminar(id_format);
            return res.status(204).end();
        }
        catch (error) {
            if (error instanceof ErrorFinding)
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.NOT_FOUND,
                    message: error.message
                });
            return res.status(500).json({
                estatus: ESTATUS_RESPONSE.ERROR,
                message: MSG_RESPONSE.SERVER_ERROR
            });
        }
    }
    async getAll(req, res) {
        try {
            const list_all_client = await this.service.getAllInfo();
            return res.status(200).json({
                estatus: ESTATUS_RESPONSE.SUCCESS,
                client_list: list_all_client
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
            if (!validate_users_id(id))
                return res.status(400).json({
                    estatus: ESTATUS_RESPONSE.EMPTY_INFO,
                    message: MSG_RESPONSE.INVALID_ID
                });
            const id_format = Number(id);
            const client_info = (await this.service.getInfo(id_format))[0];
            if (!client_info)
                return res.status(404).json({
                    estatus: ESTATUS_RESPONSE.NOT_FOUND,
                    message: MSG_RESPONSE.NOT_FOUND
                });
            return res.status(200).json({
                estatus: ESTATUS_RESPONSE.SUCCESS,
                client_info: client_info
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
export default ClienteController;
