import Cliente from "./clientes.js";
import { IclaseRepo } from "../interfaces/interface_class_repo.js";
import { ClienteDatos, ClienteQuery, ESTATUS_CLIENTE } from "../../types/clientes.js";
import { ClaseRepo } from "../abstract_classes/clasesRepo.js";
import DBPostgre from "../../config/db.js";
import { ErrorDeleting, ErrorFinding, ErrorUpdating } from "../errors/class_error.js";
import { ErrorClientExists } from "../errors/error_info.js";

export class ClienteRepository extends ClaseRepo<Cliente> implements IclaseRepo<Cliente, ClienteDatos>{
    constructor(private db: DBPostgre){
        super();
    }

    /**
     * Función para obtener el identificador del cliente en base a los datos que se tienen en la respectiva clase
     * @param data recibe una clase Cliente
     * @returns un identificador de tipo numerico
     */
    protected override async getID(data: Cliente): Promise<number> {
        const query = `
            SELECT
                *
            FROM clientes
            WHERE estatus = $4
            and nombre = $1
            and apellidos = $2
            and correo = $3;
        `;

        const sql_resultado: Array<ClienteQuery> = await this.db.query<ClienteQuery>(query, [data.nombre, data.apellidos, data.correo, ESTATUS_CLIENTE.ACTIVO]);

        if(!sql_resultado.length) throw new ErrorFinding("El cliente ha buscar no existe");
        else return sql_resultado[0].id;
    }

    /**
     * Función que nos dira si un usuario existe y esta activo dependiendo su identificador
     * @param id identificador de tipo numerico
     * @returns un valor Booleano dependiendo la longitud del arreglo resultante de la consulta
     */
    protected override async isExistById(id: number): Promise<boolean> {
        const query: string = `
            SELECT 
                *
            FROM clientes
            where estatus = $2
            and id = $1
        `;
        const sql_resultado: Array<ClienteQuery> = await this.db.query<ClienteQuery>(query, [id, ESTATUS_CLIENTE.ACTIVO]);
        return sql_resultado.length ? true : false;
    }

    protected override async isExist(data: Cliente): Promise<boolean> {
        const query: string = `
            SELECT 
                1
            FROM clientes
            where estatus = $1
            and nombres = $2
            and apellidos = $3
            and correo = $4;
        `;
        const sql_resultado: Array<ClienteQuery> = await this.db.query<ClienteQuery>(query, [ESTATUS_CLIENTE.ACTIVO, data.nombre, data.apellidos, data.correo, data.wpp, data.estatus]);
        return sql_resultado.length ? true : false;
    }

    /**
     * Función para obtener la información completa de nuestro cliente
     * @param id identificador de tipo numerico
     * @returns un arreglo con la información necesaria del cliente
     */
    async getInfo(id: number): Promise<Array<ClienteDatos>> {
        const query: string = `
            SELECT 
                * 
            FROM clientes
            where id = $1
            and estatus is not $2;
        `;
        const sql_result: Array<ClienteQuery>= await this.db.query<ClienteQuery>(query, [id, ESTATUS_CLIENTE.DESACTIVADO]);
        if(!sql_result.length) return []

        let info: Array<ClienteDatos> = sql_result.map((e)=> ({
            id: e.id,
            data: new Cliente(e.nombres, e.apellidos, e.correo, e.whatsapp , e.estatus),
            fecha_alta: e.fecha_alta,
            fecha_baja: e.fecha_baja
        }));
        return info;
    }

    /**
     * Función para obtener la información de todos los clientes 
     * @returns un arreglo con la información de todos los clientes
     */
    async getAll(): Promise<Array<ClienteDatos>> {
        const query: string = `SELECT * FROM clientes where estatus != $1;`;
        const sql_result: Array<ClienteQuery>= await this.db.query<ClienteQuery>(query, [ESTATUS_CLIENTE.DESACTIVADO]);
        if(!sql_result.length) return []

        let info: Array<ClienteDatos> = sql_result.map((e)=> ({
            id: e.id,
            data: new Cliente(e.nombres, e.apellidos, e.correo, e.whatsapp , e.estatus),
            fecha_alta: e.fecha_alta,
            fecha_baja: e.fecha_baja
        }));
        return info;
    }

    async crear(data: Cliente): Promise<void> {
        if(await this.isExist(data)) throw new ErrorClientExists("Cliente con datos similares existentes");
        const query: string = `
            INSERT INTO clientes 
            (nombres, apellidos, correo, whatsapp, estatus, fecha_alta) values
            ($1, $2, $3, $4, $5, NOW());
        `;

        await this.db.query(query, [data.nombre, data.apellidos, data.correo, data.wpp, data.estatus]);
    }

    /**
     * Función que actualiza los datos de un cliente
     * @param id identificador del usaurio
     * @param new_data Clase cliente con los datos nuevos que tendrá
     * 
     * No retorna nada pero ante la situación tira un error personalizado
     */
    async actualizar(id: number, new_data: Cliente, other_data = {estatus: ESTATUS_CLIENTE}): Promise<void> {
        if(!(await this.isExistById(id))) throw new ErrorFinding("El cliente no esta dado de alta");
 
        try {
            const query: string = `
                UPDATE clientes
                SET nombres = $1,
                apellidos = $2,
                correo = $3,
                whatsapp = $4,
                estatus = $5
                WHERE id = $6
                and estatus = $7;
            `;
            await this.db.query(query, [new_data.nombre, new_data.apellidos, new_data.correo, new_data.estatus, id, other_data.estatus]);
        } catch (error) {
            console.error(error);
            throw new ErrorUpdating("Error al intentar actualizar el cliente");
        }
    }
    
    /**
     * Función para eliminar a algun cliente
     * @param id identificador del cliente a eliminar
     * No retorna nada pero tira errores personalizados dependiendo el caso
     */
    async eliminar(id: number): Promise<void> {
        if(!(await this.isExistById(id))) throw new ErrorFinding("El cliente no esta dado de alta");
        try {
            const query: string = `
                UPDATE clientes
                SET estatus = $1,
                fecha_baja = NOW()
                WHERE id = $2;
            `;
            await this.db.query(query, [ESTATUS_CLIENTE.DESACTIVADO, id]);
        } catch (error) {
            console.error(error);
            throw new ErrorDeleting("Error al intentar eliminar al cliente");
        }
    }
}