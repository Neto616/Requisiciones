// Node modules
import { Pool } from "pg";
import dotenv from "dotenv";
// leer .env
dotenv.config();
class DBPostgre {
    pool;
    tryConnection = 0;
    constructor() {
        this.pool = new Pool({
            user: process.env.DB_USER,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            password: process.env.DB_PASS,
            port: Number(process.env.DB_PORT)
        });
    }
    async checkConnection() {
        if (!this.pool)
            return false;
        try {
            await this.pool.query("SELECT 1");
            return true;
        }
        catch (error) {
            console.error(`Error al checar la coneccion: ${error}`);
            return false;
        }
    }
    async connect() {
        console.log("Realizando la conexión a la base de datos 🤕");
        try {
            if (!(await this.checkConnection())) {
                await this.pool?.connect();
                this.tryConnection = 0;
                console.log("Se ha realizado la conexión de manera exitosa");
            }
        }
        catch (error) {
            if (this.tryConnection >= 2) {
                throw new Error(`Error al conectar a base de datos: ${error}`);
            }
            else {
                console.log("Reintentando la conexión ⌛");
                this.tryConnection += 1;
                setTimeout(async () => await this.connect(), 1500);
            }
        }
    }
    async query(sql, params) {
        if (!(await this.checkConnection()))
            await this.connect();
        try {
            console.log("Ejecutando SQL:", sql);
            console.log("Con parámetros:", params);
            let result = await this.pool.query(sql, params);
            return result?.rows ?? [];
        }
        catch (error) {
            throw new Error(`Error en la consulta: ${error}`);
        }
    }
    async close() {
        if (!(await this.checkConnection()))
            throw new Error("No se puede desconectar porque no estas conectado a base de datos");
        try {
            await this.pool?.end();
        }
        catch (error) {
            console.error(`El error que se obtuvo es: ${error}`);
            throw new Error("Error al desconectar la base de datos");
        }
    }
}
export default DBPostgre;
