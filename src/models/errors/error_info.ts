export class ErrorTypeData extends Error {
    constructor(mensaje: string) {
        super(mensaje);
        this.name = "ErrorTypeData";
    }
}

export class EmptyInfoError extends Error {
    constructor(mensaje: string) {
        super(mensaje);
        this.name = "EmptyInfoError";
    }
}

export class ErrorData extends Error {
    constructor(mensaje:  string) {
        super(mensaje);
        this.name = "ErrorData";
    }
}

export class EmailDenied extends Error {
    constructor(mensaje: string){
        super(mensaje);
        this.name = "EmailDenied";
    }
}

export class PassworDenied extends Error {
    constructor(mensaje: string){
        super(mensaje);
        this.name = "PasswordDenied";
    }
}

export class ErrorClientExists extends Error {
    constructor(mensaje: string) {
        super(mensaje);
        this.name = "ErrorClientExists";
    }
}

export class ErrorUserExists extends Error {
    constructor(mensaje: string) {
        super(mensaje);
        this.name = "ErrorUserExists";
    }
}

export class ErrorUserNotExist extends Error {
    constructor(mensaje: string) {
        super(mensaje);
        this.name = "ErrorUserNotExist";
    }
}

export class ErrorRequisicionExist extends Error {
    constructor(mensaje: string) {
        super(mensaje);
        this.name = "ErrorRequisicionExist";
    }
}

export class ErrorRequisicionNotExist extends Error {
    constructor(mensaje: string) {
        super(mensaje);
        this.name = "ErrorRequisicionNotExist";
    }
}