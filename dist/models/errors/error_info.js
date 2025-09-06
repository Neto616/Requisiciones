export class EmptyInfoError extends Error {
    constructor(mensaje) {
        super(mensaje);
        this.name = "EmptyInfoError";
    }
}
