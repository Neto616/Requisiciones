import Usuario from "../models/usuarios/usuarios.js"

export enum TIPO_USER {
    ADMIN = 1,
    ELABORAR = 2,
    REVISAR = 3
}

export enum ESTATUS_USER {
    ACTIVO = 1,
    DESACTIVADO = 0
}

export type UsuarioForm = {
    nombres: string,
    apellidos: string,
    usuario: string,
    correo: string,
    contrasena: string,
    tipo: TIPO_USER
}

export type UsuarioQuery = {
    id: number,
    nombres: string,
    apellidos: string,
    usuario: string,
    correo: string
    contrasena: string,
    tipo: TIPO_USER,
    estatus: ESTATUS_USER,
    fecha_alta: Date,
    fecha_baja: Date | null
}

export type UsuarioDatos = {
    id: number,
    data: Usuario,
    tipo: TIPO_USER,
    estatus: ESTATUS_USER,
    fecha_alta: Date,
    fecha_baja: Date | null
}