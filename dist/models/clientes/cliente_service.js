import { ESTATUS_CLIENTE } from "../../types/clientes.js";
import ClienteValidator from "./cliente_validator";
import Cliente from "./clientes";
export class ClienteService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async getInfo(id) {
        const client_info = await this.repository.getInfo(id);
        return client_info;
    }
    async getAllInfo() {
        const all_clients_info = await this.repository.getAll();
        return all_clients_info;
    }
    async crear(data) {
        ClienteValidator.validate(data);
        const client = new Cliente(data.nombres, data.apellidos, data.correo, data.whatsapp, ESTATUS_CLIENTE.ACTIVO);
        await this.repository.crear(client);
    }
    async actualizar(id, new_data) {
        ClienteValidator.validate(new_data);
        const client = new Cliente(new_data.nombres, new_data.apellidos, new_data.correo, new_data.whatsapp, ESTATUS_CLIENTE.ACTIVO);
        await this.repository.actualizar(id, client);
    }
    async eliminar(id) {
        await this.repository.eliminar(id);
    }
}
