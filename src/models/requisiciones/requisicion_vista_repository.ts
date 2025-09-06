import IDB from "../../config/interfaceDB.js";
import { IRequisicionVista } from "../interfaces/interface_requisicion_vista.js";

class RequisicionVistaRepository implements IRequisicionVista {
    constructor(private db: IDB){}

    async newView(user_id: number, requisicion_id: string): Promise<void> {
        const query: string = `
        INSERT INTO usuario_requisicion
            (usuario, requisicion)
        VALUES
            ($1, $2)
        ON CONFLICT (usuario, requisicion) DO NOTHING;
        `;

        await this.db.query(query, [user_id, requisicion_id]);
    }

    async isUserSeeRequisicion(user_id: number, requisicion_id: string): Promise<boolean> {
        const query: string = `
            SELECT 
                1 
            FROM usuario_requisicion
            WHERE usuario = $1
            AND requisicion = $2
        `;

        const result_query: Array<{ user: number, requisicion: string}> = await this.db.query<{ user: number, requisicion: string}>(query, [user_id, requisicion_id])
        return result_query.length ? true : false;
    }
}

export default RequisicionVistaRepository;