class RequisicionVistaRepository {
    db;
    constructor(db) {
        this.db = db;
    }
    async newView(user_id, requisicion_id) {
        const query = `
        INSERT INTO usuario_requisicion
            (usuario, requisicion)
        VALUES
            ($1, $2)
        ON CONFLICT (usuario, requisicion) DO NOTHING;
        `;
        await this.db.query(query, [user_id, requisicion_id]);
    }
    async isUserSeeRequisicion(user_id, requisicion_id) {
        const query = `
            SELECT 
                1 
            FROM usuario_requisicion
            WHERE usuario = $1
            AND requisicion = $2
        `;
        const result_query = await this.db.query(query, [user_id, requisicion_id]);
        return result_query.length ? true : false;
    }
}
export default RequisicionVistaRepository;
