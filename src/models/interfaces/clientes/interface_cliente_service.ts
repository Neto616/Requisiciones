import { ClienteDatos, ClienteForm } from "../../../types/clientes.js";

export interface IClienteService {
    crear(data: ClienteForm): Promise<void>;
    actualizar(id: number, new_data: ClienteForm): Promise<void>;
    eliminar(id: number): Promise<void>;
    getInfo(id: number): Promise<Array<ClienteDatos>>;
    getAllInfo(): Promise<Array<ClienteDatos>>;
}
