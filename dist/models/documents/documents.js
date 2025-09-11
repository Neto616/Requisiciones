import { ErrorDeletingFile, ErrorSavingFile, ExtensionNotPermited } from '../errors/error_info.js';
class Archivos {
    constructor() { }
    verificarExtensiones(extensiones, fileName) {
        const extension = "." + fileName.split(".").pop();
        const extensionLowerCase = extensiones.map(e => e.toLowerCase());
        return extensionLowerCase.includes(extension.toLowerCase());
    }
    async guardarArchivo(funcion_guardar, fileName, ruta, extensiones) {
        if (!this.verificarExtensiones(extensiones, fileName))
            throw new ExtensionNotPermited("La extensión de su archivo no esta permitida");
        try {
            await funcion_guardar(ruta.concat("/", fileName));
        }
        catch (error) {
            throw new ErrorSavingFile("Hubo un error al guardar el archivo");
        }
    }
    async borrarArchivo(funcion_eliminar, ruta) {
        try {
            await funcion_eliminar(ruta);
        }
        catch (error) {
            throw new ErrorDeletingFile("Hubo un error al eliminar el archivo");
        }
    }
}
export default Archivos;
