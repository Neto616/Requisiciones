import DBPostgre from "../../config/db.js";
import { ESTATUS_CLIENTE } from "../../types/clientes.js";
import { ESTATUS_USER, TIPO_USER, UsuarioDatos, UsuarioQuery } from "../../types/usuarios.js";
import { ClaseRepo } from "../abstract_classes/clasesRepo.js"
import { ErrorUserExists, ErrorUserNotExist } from "../errors/error_info.js";
import { IclaseRepo } from "../interfaces/interface_class_repo.js";
import Usuario from "./usuarios.js";

class UsuarioRepository extends ClaseRepo<Usuario> implements IclaseRepo<Usuario, UsuarioDatos>{
    constructor(private db: DBPostgre){
        super();
    }

    /**
     * @param data Parametro de tipo Usuario para verificar sus datos
     * @returns El id al que los datos dados pertenecen
     */
    protected override async getID(data: Usuario): Promise<number> {
        const query: string = `
            SELECT 
                id
            FROM usuarios
            WHERE estatus = $1
            AND nombre = $2
            AND apellidos = $3
            AND usuario = $4
        `;
        const busqueda = await this.db.query(query, [ESTATUS_USER.ACTIVO, data.nombre, data.apellidos, data.usuario]);
        if(!busqueda.length) throw new ErrorUserNotExist("El usuario que busca no existe");
        return busqueda[0].id;
    }

    protected override async isExist(data: Usuario): Promise<boolean> {
        const query: string = `
            SELECT 
                1
            FROM usuarios
            WHERE correo = $1
            AND usuario =  $2
            AND ESTATUS =  $3;
        `;
        const sql_resultado = await this.db.query(query, [data.correo, data.usuario, ESTATUS_USER.ACTIVO]);
        return sql_resultado.length ? true : false;
    }

    /**
     * @param id Identificador para buscar al usuario
     * @returns Retorna un verdadero o falso dependiendo si existe o no el usuario
     */
    protected override async isExistById(id: number): Promise<boolean> {
        const query: string = `
            SELECT 
                1
            FROM usuarios
            WHERE id = $1;
        `
        const sql_resultado = await this.db.query(query, [id]);
        return sql_resultado.length ? true : false;
    }

    /**
     * @param id Identificador del usuario a buscar
     * @returns La información completa del usuario solicitado
     * id, nombre, apellido, usuario, correo, contraseña, tipo, estatus, fecha alta, fecha de baja
     */
    async getInfo(id: number): Promise<Array<UsuarioDatos>> {
        const query: string = `
            SELECT
                *
            FROM usuarios
            where id = $1;
        `;
        const user_info: Array<UsuarioQuery> = await this.db.query<UsuarioQuery>(query, [id]);
        if(!user_info.length) return [];
        
        const array_user_info: Array<UsuarioDatos> = user_info.map( e => ({
            id: e.id,
            data: new Usuario(e.nombres, e.apellidos, e.correo, e.usuario, e.contrasena),
            estatus: e.estatus,
            tipo: e.tipo,
            fecha_alta: e.fecha_alta,
            fecha_baja: e.fecha_baja
        }));

        return array_user_info;
    }

    /**
     * @returns Arreglo con toda la información de todos los usuarios
     * id, nombre, apellido, usuario, correo, contraseña, tipo, estatus, fecha alta, fecha de baja
     */
    async getAll(): Promise<Array<UsuarioDatos>> {
        const query: string = `
            SELECT
                *
            FROM usuarios;
        `
        const sql_results = await this.db.query<UsuarioQuery>(query);
        if(!sql_results.length) return [];

        const array_users_info: Array<UsuarioDatos> = sql_results.map( e => ({
            id: e.id,
            data: new Usuario(e.nombres, e.apellidos, e.correo, e.usuario, e.contrasena),
            estatus: e.estatus,
            tipo: e.tipo,
            fecha_alta: e.fecha_alta,
            fecha_baja: e.fecha_baja
        }));
        return array_users_info;
    }

    /**
     * 
     * @param data Recibe una información de tipo usuario la cual se suara para generar el usuario en la base de datos
     */
    async crear(data: Usuario, other_data = {tipo: TIPO_USER, estatus: ESTATUS_CLIENTE}): Promise<void> {
        if((await this.isExist(data))) throw new ErrorUserExists("El usuario ya existe");
        const query: string = `
            INSERT INTO usuarios
            (nombres, apellidos, usuario, correo, contrasena, tipo, estatus, fecha_alta)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, NOW());
        `;
        await this.db.query(query, [data.nombre, data.apellidos, data.usuario, data.correo, data.getContrasena(), other_data.tipo, other_data.estatus]);
    }

    /**
     * 
     * @param id Recibe el identificador del usuario a actualizar
     * @param new_data 
     */
    async actualizar(id: number, new_data: Usuario, other_data = {estatus: ESTATUS_CLIENTE}): Promise<void> {
        if(!(await this.isExistById(id))) throw new ErrorUserNotExist("El usuario a actualizar no existe");
        const query: string = `
            UPDATE usuarios
            SET nombres = $1,
                apellidos   = $2,
                usuario     = $3,
                correo      = $4,
                estatus     = $5
            WHERE id = $1;
        `;
        await this.db.query(query, [new_data.nombre, new_data.apellidos, new_data.correo, other_data.estatus]);
    }

    /**
     * 
     * @param id identificador del usuario a borrar
     */
    async eliminar(id: number): Promise<void> {
        if(!(await this.isExistById(id))) throw new ErrorUserNotExist("El usuario a borrar no existe");
        const query: string = `
            UPDATE usuarios
            SET estatus = $1
            WHERE id = $2
        `;
        await this.db.query(query, [ESTATUS_USER.DESACTIVADO, id]);
    }
}

export default UsuarioRepository;