import { ClienteDatos, ClienteForm, ESTATUS_CLIENTE } from "../../types/clientes.js";
import { IclaseRepo } from "../interfaces/interface_class_repo.js";
import { IClienteService } from "../interfaces/clientes/interface_cliente_service.js";
import ClienteValidator from "./cliente_validator.js";
import Cliente from "./clientes.js";

export class ClienteService implements IClienteService {
    constructor(
        private repository: IclaseRepo<Cliente, ClienteDatos>
    ){}

    public async getInfo(id: number): Promise<Array<ClienteDatos>> {
        const client_info: Array<ClienteDatos> = await this.repository.getInfo(id); 
        return client_info;
    }

    public async getAllInfo(): Promise<Array<ClienteDatos>> {
        const all_clients_info: Array<ClienteDatos> = await this.repository.getAll();
        return all_clients_info;
    }

    public async crear(data: ClienteForm): Promise<void> {
        ClienteValidator.validate(data);
        const client: Cliente = new Cliente(data.nombres, data.apellidos, data.correo, data.whatsapp, ESTATUS_CLIENTE.ACTIVO);

        await this.repository.crear(client);
    }

    public async actualizar(id: number, new_data: ClienteForm): Promise<void> {
        ClienteValidator.validate(new_data);
        const client: Cliente = new Cliente(new_data.nombres, new_data.apellidos, new_data.correo, new_data.whatsapp, ESTATUS_CLIENTE.ACTIVO);

        await this.repository.actualizar(id, client);
    }

    public async eliminar(id: number): Promise<void> {
        await this.repository.eliminar(id);
    }

}