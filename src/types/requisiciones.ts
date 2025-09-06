import Requisiciones from "../models/requisiciones/requisiciones.js"
import Usuario from "../models/usuarios/usuarios.js"

export enum ESTATUS_REQUISICIONES {
    ELIMINADO = -1,
    CANCELADO = 0,
    APROBADO  = 1,
    PENDIENTE = 2,
    REVISADO  = 3
}

export type RequisicionesForm = {
    numero_control: string,
    elaboro_id: number,
    cliente_id: number,
    revisa_id: number,
    autoriza_id: number,
    solicitud: number,
    suministro: number,
    obra: string,
    estatus: ESTATUS_REQUISICIONES
    costo?: number,
    numero_orden?: string
}

export type RequisicionQuery = {
    id: string,
    elaboro: number,
    cliente: number,
    usuario_revisa: number,
    usuario_autoriza: number,
    solicitud: number,
    suministro: number,
    obra: string,
    costo: number,
    num_orden: string,
    estatus: ESTATUS_REQUISICIONES,
    fecha_alta: Date,
    fecha_baja: Date | null
}

export type RequisicionQueryAll = {
    id: string,
    nombres: string,
    apellidos: string,
    usuario: string,
    contrasena: string,
    correo: string,
    estatus: ESTATUS_REQUISICIONES
}

export type RequisicionDatos = {
    data: Requisiciones,
    fecha_alta: Date,
    fecha_baja: Date | null
}

export type RequisicionAllList = {
    id: string,
    elaboro: Usuario,
    estatus: ESTATUS_REQUISICIONES
}