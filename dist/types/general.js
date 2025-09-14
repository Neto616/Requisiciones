export var ESTATUS_RESPONSE;
(function (ESTATUS_RESPONSE) {
    ESTATUS_RESPONSE[ESTATUS_RESPONSE["ALREADY_EXISTS"] = 4] = "ALREADY_EXISTS";
    ESTATUS_RESPONSE[ESTATUS_RESPONSE["NOT_FOUND"] = 3] = "NOT_FOUND";
    ESTATUS_RESPONSE[ESTATUS_RESPONSE["EMPTY_INFO"] = 2] = "EMPTY_INFO";
    ESTATUS_RESPONSE[ESTATUS_RESPONSE["SUCCESS"] = 1] = "SUCCESS";
    ESTATUS_RESPONSE[ESTATUS_RESPONSE["ERROR"] = 0] = "ERROR";
})(ESTATUS_RESPONSE || (ESTATUS_RESPONSE = {}));
export var MSG_RESPONSE;
(function (MSG_RESPONSE) {
    MSG_RESPONSE["ALREADY_EXISTS"] = "Ya existe informaci\u00F3n con esos datos";
    MSG_RESPONSE["SERVER_ERROR"] = "Ha ocurrido un error en el servidor, intentar de nuevo m\u00E1s tarde.";
    MSG_RESPONSE["NOT_FOUND"] = "No se encontro el dato solicitado favor de intentarlo de nuevo.";
    MSG_RESPONSE["INVALID_ID"] = "Id del usuario no permitido.";
})(MSG_RESPONSE || (MSG_RESPONSE = {}));
