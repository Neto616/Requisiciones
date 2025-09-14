import { ESTATUS_USER, UsuarioDatos, UsuarioForm } from '../../../types/usuarios.js';

export interface IUserService {
    crear(data: UsuarioForm): Promise<void>;
    actualizar(id: number, new_data: UsuarioForm, estatus: ESTATUS_USER): Promise<void>;
    eliminar(id: number): Promise<void>;
    getInfo(id: number): Promise<Array<UsuarioDatos>>;
    getAllInfo(list_estatus: Array<ESTATUS_USER>): Promise<Array<UsuarioDatos>>;
}