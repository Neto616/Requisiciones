import { QueryResultRow } from "pg";

interface IDB {
    // checkConnection(): Promise<boolean>
    connect(): Promise<void>;
    query<T extends QueryResultRow>(sql: string, params?: Array<any>): Promise<Array<T>>;
    close(): Promise<void>
}

export default IDB