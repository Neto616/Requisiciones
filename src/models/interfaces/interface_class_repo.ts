import { ESTATUS_CLIENTE } from "../../types/clientes";
import { ESTATUS_USER } from "../../types/usuarios";

export interface IclaseRepo<T, TDO> {
    getInfo(id: number): Promise<Array<TDO>>;
    getAll(list_estatus?: Array<ESTATUS_USER | ESTATUS_CLIENTE>): Promise<Array<TDO>>;
    crear(data: T, other_data?:Record<string, any>): Promise<void>;
    actualizar(id: number, new_data: T, other_data?:Record<string, any>): Promise<void>;
    eliminar(id: number): Promise<void>;
}