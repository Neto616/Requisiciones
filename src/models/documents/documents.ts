import { IArchivos } from '../interfaces/interface_documents.js';
import { ErrorDeletingFile, ErrorSavingFile, ExtensionNotPermited } from '../errors/error_info.js';

class Archivos implements IArchivos{
    constructor(){}

    private verificarExtensiones(extensiones: Array<string>, fileName: string): boolean {
        const extension: string = "."+fileName.split(".").pop();
        const extensionLowerCase: Array<string> = extensiones.map(e => e.toLowerCase());
        return extensionLowerCase.includes(extension.toLowerCase());
    }

    async guardarArchivo(funcion_guardar: (ruta: string) => Promise<string>, fileName: string, ruta: string, extensiones: Array<string>): Promise<void> {
        if(!this.verificarExtensiones(extensiones, fileName)) throw new ExtensionNotPermited("La extensión de su archivo no esta permitida");

        try {
            await funcion_guardar(ruta.concat("/",fileName));
        } catch (error) {
            throw new ErrorSavingFile("Hubo un error al guardar el archivo");
        }
    }

    async borrarArchivo(funcion_eliminar: Function, ruta: string): Promise<void> {
        try {
            await funcion_eliminar(ruta);
        } catch (error) {
            throw new ErrorDeletingFile("Hubo un error al eliminar el archivo");
        }
    }
}

export default Archivos;