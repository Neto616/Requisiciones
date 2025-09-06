import IDB from "../../config/interfaceDB.js";
import { ESTATUS_REQUISICIONES, RequisicionAllList, RequisicionDatos, RequisicionQuery, RequisicionQueryAll } from "../../types/requisiciones.js";
import { IRequisicionRepo } from "../interfaces/interface_requisicion.js";
import Usuario from "../usuarios/usuarios.js";
import Requisiciones from "./requisiciones.js";

class RequisicionRepository implements IRequisicionRepo{
    constructor(private db: IDB){}

    // CRUD para las requisiciones
    async crear(data: Requisiciones): Promise<void> {
        const query: string = `
            INSERT INTO requisiciones
            (id, elaboro, cliente, usuario_revisa, usaurio_autoriza, solicitud, suministro, obra, costo, num_orden, estatus, fecha_alta)
            VALUES
            ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, NOW());
        `;
        await this.db.query(query, [
            data.numero_control,
            data.elaboro_id,
            data.cliente_id,
            data.revisa_id,
            data.autoriza_id, 
            data.solicitud,
            data.suministro,
            data.obra,
            data.costo ?? '',
            data.numero_orden ?? '',
            ESTATUS_REQUISICIONES.PENDIENTE
        ]);
    }

    async actualizar(id: string, new_data: Requisiciones, estatus: ESTATUS_REQUISICIONES): Promise<void> {
        const query: string = `
            UPDATE requisiciones
            SET
                elaboro          = $1,
                cliente          = $2,
                usuario_revisa   = $3, 
                usaurio_autoriza = $4, 
                solicitud        = $5, 
                suministro       = $6, 
                obra             = $7,  
                costo            = $8, 
                num_orden        = $9, 
                estatus          = $10
            WHERE id = $11;
        `;

        await this.db.query(query, [
            new_data.elaboro_id,
            new_data.cliente_id,
            new_data.revisa_id,
            new_data.autoriza_id,
            new_data.solicitud,
            new_data.suministro,
            new_data.obra,
            new_data.costo,
            new_data.numero_orden,
            estatus,
            new_data.numero_control
        ]);
    }

    async eliminar(id: string): Promise<void> {
        const query: string = `
            UPDATE requisiciones
                set estatus = $1
            where id = $2
        `;
        await this.db.query(query, [ESTATUS_REQUISICIONES.ELIMINADO, id]);
    }

    async changeEstatus(id: string, estatus: ESTATUS_REQUISICIONES): Promise<void> {
        const query: string = `
            UPDATE requisiciones
                set estatus = $1
            WHERE id = $2;
        `;

        await this.db.query(query, [estatus, id]);
    }

    /**
     * 
     * @param data los datos de la requisicion para visualizar que no exista uan requisicion con los datos actuales
     * @returns  Los datos de la tabla o algun nulo en caso de no encontrar nada
     */
    async getByData(data: Requisiciones): Promise<RequisicionDatos | null> {
        const query: string = `
            SELECT 
                *
            FROM requisiciones
            WHERE id = $1
            AND elaboro = $2
            AND cliente = $3
            AND usuario_revisa = $4
            AND usuario_autoriza = $5
            AND solicitud  = $6
            AND suministro  = $7
            AND obra = $8
            AND costo = $9
            AND num_orden = $10
            AND estatus NOT IN ($11, $12);
        `;

        const requisiciones_info: Array<RequisicionQuery> = await this.db.query(query, [
            data.numero_control,
            data.elaboro_id,
            data.cliente_id,
            data.revisa_id,
            data.autoriza_id,
            data.solicitud,
            data.suministro,
            data.obra,
            data.costo ?? '',
            data.numero_control ?? '',
            ESTATUS_REQUISICIONES.ELIMINADO,
            ESTATUS_REQUISICIONES.CANCELADO
        ]);


        if(!requisiciones_info.length) return null;
        const requisicion_data: RequisicionQuery = requisiciones_info[0]
        const requisiciones_info_format: RequisicionDatos = {
            data: new Requisiciones(requisicion_data.id, requisicion_data.elaboro, requisicion_data.cliente, requisicion_data.usuario_revisa, requisicion_data.usuario_autoriza, requisicion_data.solicitud, requisicion_data.suministro, requisicion_data.obra, requisicion_data.costo, requisicion_data.num_orden),
            fecha_alta: requisicion_data.fecha_alta,
            fecha_baja: requisicion_data.fecha_baja
        };

        return requisiciones_info_format;
    }

    async getById(id: string): Promise<RequisicionDatos | null> {
        const query: string = `
            SELECT 
                *
            FROM requisiciones
            where id = $1
        `;
        const requisicion_info: Array<RequisicionQuery> = await this.db.query<RequisicionQuery>(query, [id]);
        if(!requisicion_info.length) return null;
        const data = requisicion_info[0]
        const requisicion_info_format: RequisicionDatos = {
            data: new Requisiciones(data.id, data.elaboro, data.cliente, data.usuario_revisa, data.usuario_autoriza, data.solicitud, data.suministro, data.obra, data.costo, data.num_orden),
            fecha_alta: data.fecha_alta,
            fecha_baja: data.fecha_baja
        };

        return requisicion_info_format;
    }

    async getListRequisiciones(): Promise<Array<RequisicionAllList>> {
        const query: string = `
            SELECT
                r.id,
                u.nombres,
                u.apellidos,
                u.usuario,
                u.contrasena,
                u.correo,
                r.estatus
            FROM requisiciones r
            INNER JOIN usuarios u on r.elaboro = u.id;
        `;
        const list_requisiciones: Array<RequisicionQueryAll> = await this.db.query<RequisicionQueryAll>(query);

        if(!list_requisiciones.length) return [];

        const list_all_requisiciones: Array<RequisicionAllList> = list_requisiciones.map(e => ({
            id: e.id,
            elaboro: new Usuario(e.nombres, e.apellidos, e.correo, e.usuario, e.contrasena),
            estatus: e.estatus
        }));

        return list_all_requisiciones;
    }
}

export default RequisicionRepository;