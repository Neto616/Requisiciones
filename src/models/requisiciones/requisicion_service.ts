import { ESTATUS_REQUISICIONES, RequisicionAllList, RequisicionDatos, RequisicionesForm } from "../../types/requisiciones.js";
import { EmptyInfoError, ErrorData, ErrorRequisicionExist, ErrorRequisicionNotExist } from "../errors/error_info.js";
import { IRequisicionRepo, IRequisicionService } from "../interfaces/interface_requisicion.js";
import { IUserService } from "../interfaces/user/interface_user_service.js";
import RequisicionValidator from "./requisicion_validator.js";
import Requisiciones from "./requisiciones.js";

class RequisicionService implements IRequisicionService{
    constructor(
        private repo: IRequisicionRepo,
        private user_service: IUserService
    ){}

    async crear(data: RequisicionesForm): Promise<void> {
        RequisicionValidator.validate(data);
        const [usuario_elaboro, usuario_revisa, usuario_autoriza] = await Promise.all([
            this.user_service.getInfo(data.elaboro_id),
            this.user_service.getInfo(data.revisa_id),
            this.user_service.getInfo(data.autoriza_id)
        ])

        if(!usuario_elaboro.length || !usuario_revisa.length || !usuario_autoriza.length) throw new EmptyInfoError("No existe el usuario solicitado.");
        const requisicion: Requisiciones = new Requisiciones(data.numero_control, 
            data.elaboro_id, data.cliente_id, data.revisa_id, 
            data.autoriza_id, data.solicitud, data.suministro, 
            data.obra, data.costo, data.numero_orden);
            
        const isExist: RequisicionDatos | null = await this.repo.getByData(requisicion);

        if(isExist) throw new ErrorRequisicionExist("Ya existe una requisición con los mismos datos.");
        await this.repo.crear(requisicion);
    }

    async actualizar(id: string, new_data: RequisicionesForm): Promise<void> {
        RequisicionValidator.validate(new_data);
        const requisicion: Requisiciones = new Requisiciones(new_data.numero_control,
            new_data.elaboro_id, new_data.cliente_id, new_data.revisa_id,
            new_data.autoriza_id, new_data.solicitud, new_data.suministro,
            new_data.obra, new_data.costo, new_data.numero_orden
        );

        const [requisicionById, requisicionByData] = await Promise.all([
            this.repo.getById(id),
            this.repo.getByData(requisicion)
        ]);

        if(!requisicionById) throw new ErrorRequisicionNotExist("No existe una requisición con el ID solicitado");
        if(requisicionByData) throw new ErrorRequisicionExist("Ya existe una requisicion con la misma inforamción");
        await this.repo.actualizar(id, requisicion, new_data.estatus);
    }

    async changeEstatus(id: string, estatus: ESTATUS_REQUISICIONES): Promise<void> {
        if(!await this.repo.getById(id)) throw new ErrorRequisicionNotExist("No existe una requisición con ese identficador");
        if(!Object.values(ESTATUS_REQUISICIONES).includes(estatus)) throw new ErrorData("Ese estatus no existe");
        await this.repo.changeEstatus(id, estatus);
    }

    async eliminar(id: string): Promise<void> {
        await this.repo.eliminar(id);
    }

    async getAll(): Promise<Array<RequisicionAllList>> {
        return await this.repo.getListRequisiciones();
    }

    async getInfo(id: string): Promise<RequisicionDatos> {
        const requisicion_info: RequisicionDatos | null = await this.repo.getById(id)

        if(!requisicion_info) throw new ErrorRequisicionNotExist("No existe una requisición con ese identificador");
        return requisicion_info;
    }
}

export default RequisicionService;