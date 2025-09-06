import Cliente from "../clientes/clientes.js";
import RequisicionRepository from "../requisiciones/requisicion_repository.js";
import Requisiciones from "../requisiciones/requisiciones.js";
import Usuario from "../usuarios/usuarios.js";

export interface Admin {
    //Requisiciones
    eliminarRequisicion(id: number, repository: RequisicionRepository): Promise<void>;
    //Clientes
    crearCliente(data: Cliente, other_data?: Record<string, any>): Promise<void>;
    actualizarCliente(id: number, new_data: Cliente, ther_data?: Record<string, any>): Promise<void>;
    eliminarCLiente(id: number): Promise<void>;
    //Usuarios
    crearCliente(data: Usuario, other_data?: Record<string, any>): Promise<void>;
    actualizarCliente(id: number, new_data: Usuario, ther_data?: Record<string, any>): Promise<void>;
    eliminarCLiente(id: number): Promise<void>;
}

export interface Elaborar {
    crearRequisicion(requisicion: Requisiciones, repository: RequisicionRepository): Promise<void>;
}

export interface Revisar {
    revisarRequisicion(id: number, repository: RequisicionRepository): Promise<void>;
    cancelarRequisicion(id: number, repository: RequisicionRepository): Promise<void>;
}