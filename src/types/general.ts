export enum ESTATUS_RESPONSE {
    ALREADY_EXISTS = 4,
    NOT_FOUND      = 3,
    EMPTY_INFO     = 2,
    SUCCESS        = 1,
    ERROR          = 0
}

export enum MSG_RESPONSE {
    ALREADY_EXISTS = "Ya existe información con esos datos",
    SERVER_ERROR   = "Ha ocurrido un error en el servidor, intentar de nuevo más tarde.",
    NOT_FOUND      = "No se encontro el dato solicitado favor de intentarlo de nuevo.",
    INVALID_ID     = "Id del usuario no permitido."
}