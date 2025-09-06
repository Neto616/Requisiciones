
export interface IclaseRepo<T, TDO> {
    getInfo(id: number): Promise<Array<TDO>>;
    getAll(): Promise<Array<TDO>>;
    crear(data: T, other_data?:Record<string, any>): Promise<void>;
    actualizar(id: number, new_data: T, other_data?:Record<string, any>): Promise<void>;
    eliminar(id: number): Promise<void>;
}