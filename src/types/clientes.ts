import Cliente from "../models/clientes/clientes.js"
import { TIPO_USER } from "./usuarios.js"
import { ESTATUS_RESPONSE } from './general.js';

export enum ESTATUS_CLIENTE {
    DESACTIVADO = 0,
    ACTIVO = 1,
}

export type ClienteForm = {
    nombres: string,
    apellidos: string,
    correo: string,
    whatsapp: string
}

export type ClienteQuery = {
    id: number,
    nombres: string,
    apellidos: string,
    correo: string,
    whatsapp: string,
    estatus: ESTATUS_CLIENTE,
    fecha_alta: Date,
    fecha_baja: Date | null
}

export type ClienteDatos = {
    id: number,
    data: Cliente,
    fecha_alta: Date,
    fecha_baja: Date | null
}

// Respuesta de la creación de cliente

export type SuccessCreate = {
    estatus: ESTATUS_RESPONSE.SUCCESS,
    data: ResponseCreateData
}

export type ErrorCreate = {
    estatus: ESTATUS_RESPONSE.ERROR,
    mensaje: string
}

export type ResponseCreateData = {
    id: number
    name: string,
    tipo: TIPO_USER,
}

// Respuesta de actualización y borrado de cliente

export type SuccessUpdateDelete = {
    estatus: ESTATUS_RESPONSE.SUCCESS,
    mensaje: string
}

export type ErrorUpdateDelete = {
    estatus: ESTATUS_RESPONSE.ERROR,
    mensaje: string
}

// Client Info

export type SuccessInfo = {
    estatus: ESTATUS_RESPONSE.SUCCESS,
    data: Array<ClienteDatos>
}

export type ErrorInfo = {
    estatus: ESTATUS_RESPONSE.ERROR,
    data: Array<void>
}