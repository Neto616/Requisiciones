import { ESTATUS_USER } from "../../types/usuarios.js";
import UsuarioValidator from "./usuario_validator.js";
import Usuario from "./usuarios.js";
class UsuarioService {
    repository;
    constructor(repository) {
        this.repository = repository;
    }
    async crear(data) {
        UsuarioValidator.validate(data);
        const user = new Usuario(data.nombres, data.apellidos, data.correo, data.usuario, data.contrasena);
        await this.repository.crear(user, { tipo: data.tipo, estatus: ESTATUS_USER.ACTIVO });
    }
    async actualizar(id, new_data, estatus) {
        UsuarioValidator.validate(new_data);
        const user = new Usuario(new_data.nombres, new_data.apellidos, new_data.correo, new_data.usuario, new_data.contrasena);
        await this.repository.actualizar(id, user, { estatus });
    }
    async eliminar(id) {
        await this.repository.eliminar(id);
    }
    async getInfo(id) {
        const user_info = await this.repository.getInfo(id);
        return user_info;
    }
    async getAllInfo() {
        const all_user_info = await this.repository.getAll();
        return all_user_info;
    }
}
export default UsuarioService;
