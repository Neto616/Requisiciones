import Cliente from "./clientes.js";
import { ESTATUS_CLIENTE } from "../../types/clientes.js";
import { ClaseRepo } from "../abstract_classes/clasesRepo.js";
import { ErrorDeleting, ErrorFinding, ErrorUpdating } from "../errors/class_error.js";
export class ClienteRepository extends ClaseRepo {
    db;
    constructor(db) {
        super();
        this.db = db;
    }
    /**
     * Función para obtener el identificador del cliente en base a los datos que se tienen en la respectiva clase
     * @param data recibe una clase Cliente
     * @returns un identificador de tipo numerico
     */
    async getID(data) {
        const query = `
            SELECT
                *
            FROM clientes
            WHERE estatus = $4
            and nombre = $1
            and apellidos = $2
            and correo = $3;
        `;
        const sql_resultado = await this.db.query(query, [data.nombre, data.apellidos, data.correo, ESTATUS_CLIENTE.ACTIVO]);
        if (!sql_resultado.length)
            throw new ErrorFinding("El cliente ha buscar no existe");
        else
            return sql_resultado[0].id;
    }
    /**
     * Función que nos dira si un usuario existe y esta activo dependiendo su identificador
     * @param id identificador de tipo numerico
     * @returns un valor Booleano dependiendo la longitud del arreglo resultante de la consulta
     */
    async isExistById(id) {
        const query = `
            SELECT 
                *
            FROM clientes
            where estatus = $2
            and id = $1
        `;
        const sql_resultado = await this.db.query(query, [id, ESTATUS_CLIENTE.ACTIVO]);
        return sql_resultado.length ? true : false;
    }
    /**
     * Función para obtener la información completa de nuestro cliente
     * @param id identificador de tipo numerico
     * @returns un arreglo con la información necesaria del cliente
     */
    async getInfo(id) {
        const query = `
            SELECT 
                * 
            FROM clientes
            where id = $1
            and estatus is not $2;
        `;
        const sql_result = await this.db.query(query, [id, ESTATUS_CLIENTE.DESACTIVADO]);
        if (!sql_result.length)
            return [];
        let info = sql_result.map((e) => ({
            id: e.id,
            data: new Cliente(e.nombres, e.apellidos, e.correo, e.whatsapp, e.estatus),
            fecha_alta: e.fecha_alta,
            fecha_baja: e.fecha_baja
        }));
        return info;
    }
    /**
     * Función para obtener la información de todos los clientes
     * @returns un arreglo con la información de todos los clientes
     */
    async getAll() {
        const query = `SELECT * FROM clientes where estatus != $1;`;
        const sql_result = await this.db.query(query, [ESTATUS_CLIENTE.DESACTIVADO]);
        if (!sql_result.length)
            return [];
        let info = sql_result.map((e) => ({
            id: e.id,
            data: new Cliente(e.nombres, e.apellidos, e.correo, e.whatsapp, e.estatus),
            fecha_alta: e.fecha_alta,
            fecha_baja: e.fecha_baja
        }));
        return info;
    }
    async crear(data) {
    }
    /**
     * Función que actualiza los datos de un cliente
     * @param id identificador del usaurio
     * @param new_data Clase cliente con los datos nuevos que tendrá
     *
     * No retorna nada pero ante la situación tira un error personalizado
     */
    async actualizar(id, new_data) {
        if (!(await this.isExistById(id)))
            throw new ErrorFinding("El cliente no esta dado de alta");
        try {
            const query = `
                UPDATE
                SET nombres = $1,
                apellidos = $2,
                correo = $3,
                whatsapp = $4,
                estatus = $5
                WHERE id = $6
                and estatus = $7;
            `;
            await this.db.query(query, [...new_data.getAllData(), id, ESTATUS_CLIENTE.ACTIVO]);
        }
        catch (error) {
            console.error(error);
            throw new ErrorUpdating("Error al intentar actualizar el cliente");
        }
    }
    /**
     * Función para eliminar a algun cliente
     * @param id identificador del cliente a eliminar
     * No retorna nada pero tira errores personalizados dependiendo el caso
     */
    async eliminar(id) {
        if (!(await this.isExistById(id)))
            throw new ErrorFinding("El cliente no esta dado de alta");
        try {
            const query = `
                UPDATE clientes
                SET estatus = $1,
                fecha_baja = NOW()
                WHERE id = $2;
            `;
            await this.db.query(query, [ESTATUS_CLIENTE.DESACTIVADO, id]);
        }
        catch (error) {
            console.error(error);
            throw new ErrorDeleting("Error al intentar eliminar al cliente");
        }
    }
}
