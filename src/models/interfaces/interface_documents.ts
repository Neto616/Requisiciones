export interface IArchivos {
    guardarArchivo(funcion_guardar: (ruta: string) => Promise<string>, fileName: string, ruta: string, extensiones: Array<string>): Promise<void>;
    borrarArchivo(funcion_eliminar: Function, ruta: string): Promise<void>;
}