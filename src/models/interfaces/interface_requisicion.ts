import { ESTATUS_REQUISICIONES, RequisicionAllList, RequisicionDatos, RequisicionesForm } from '../../types/requisiciones';
import Requisiciones from "../requisiciones/requisiciones.js";

export interface IRequisicionRepo {
    //CRUD de toda la vida
    crear(data: Requisiciones): Promise<void>;
    actualizar(id: string, new_data: Requisiciones, estatus: ESTATUS_REQUISICIONES): Promise<void>;
    eliminar(id: string): Promise<void>;
    /**
     * 
     * @param id identificador de la requisicion a actualizar
     * @param estatus el nuevo estatus a recibir
     * 
     * Metodo que solo cambiara el estatus de la requisición
     */
    changeEstatus(id: string, estatus: ESTATUS_REQUISICIONES): Promise<void>;
    /**
     * 
     * @param data datos de la requisicion a buscar
     * Busca si existe una requisicion con las misma informacion
     */
    getByData(data: Requisiciones): Promise<RequisicionDatos | null>;
    /**
     * Trae la información de una requisicion especifica
     * */
    getById(id: string): Promise<RequisicionDatos | null>;
    /**
     * Trae todas las requisiciones existentes para mostrar en pantalla
     */
    getListRequisiciones(): Promise<Array<RequisicionAllList>>;
}

export interface IRequisicionService {
    // CRUD
    crear(data: RequisicionesForm): Promise<void>;
    actualizar(id: string, new_data: RequisicionesForm): Promise<void>;
    eliminar(id: string): Promise<void>;
    /**
     * 
     * @param id identificador de la requicion
     * @param estatus el nuevo estatus que tendrá
     * Cambiara el estatus de la requisición
     */
    changeEstatus(id: string, estatus: ESTATUS_REQUISICIONES): Promise<void>;
    /**
     * Obtener la informacion de todas las requisiciiones para mostrar en la tabla
     */
    getAll(): Promise<Array<RequisicionAllList>>;
    /**
     * 
     * @param id identificador de la requisición a la que queremos encontrar sus datos
     * retorna la información de la requisicion
     */
    getInfo(id: string): Promise<RequisicionDatos>;
}