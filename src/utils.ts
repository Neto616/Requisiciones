import CryptoJS from "crypto-js";
import { TIPO_USER } from "./types/usuarios.js";
const key: string = "CryptoKeyFromTheProjectCreatedByME_160603"

export function validate_email(correo: string): boolean{
    if(!correo.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) return false;

    return true;
}

export function encode(thing_to_encode:string): string {
    return CryptoJS.AES.encrypt(thing_to_encode, key).toString();
}

export function decode(thing_to_decode:string): string {
    return CryptoJS.AES.decrypt(thing_to_decode, key).toString(CryptoJS.enc.Utf8);
}



declare module 'express-session' {
    interface SessionData {
        usuario: {
            tipo: TIPO_USER,
            id: number,
            fullName: string
        }
    }
}