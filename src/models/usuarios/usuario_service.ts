import { ESTATUS_USER, UsuarioDatos, UsuarioForm } from "../../types/usuarios.js";
import { IclaseRepo } from "../interfaces/interface_class_repo.js";
import { IUserService } from "../interfaces/user/interface_user_service.js";
import UsuarioValidator from "./usuario_validator.js";
import Usuario from "./usuarios.js";

class UsuarioService implements IUserService {
    constructor(private repository: IclaseRepo<Usuario, UsuarioDatos>){}

    public async crear(data: UsuarioForm): Promise<void> {
        UsuarioValidator.validate(data);
        const user: Usuario = new Usuario(data.nombres, data.apellidos, data.correo, data.usuario, data.contrasena);
        await this.repository.crear(user, {tipo: data.tipo, estatus: ESTATUS_USER.ACTIVO});
    }

    public async actualizar(id: number, new_data: UsuarioForm, estatus: ESTATUS_USER): Promise<void> {
        UsuarioValidator.validate(new_data);
        const user: Usuario = new Usuario(new_data.nombres, new_data.apellidos, new_data.correo, new_data.usuario, new_data.contrasena);
        await this.repository.actualizar(id, user, { estatus });
    }

    public async eliminar(id: number): Promise<void> {
        await this.repository.eliminar(id);
    }

    public async getInfo(id: number): Promise<Array<UsuarioDatos>> {
        const user_info: Array<UsuarioDatos> = await this.repository.getInfo(id);
        return user_info;
    }

    public async getAllInfo(): Promise<Array<UsuarioDatos>> {
        const all_user_info: Array<UsuarioDatos> = await this.repository.getAll();
        return all_user_info;
    }
}

export default UsuarioService;