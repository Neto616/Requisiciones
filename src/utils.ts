import CryptoJS from "crypto-js";
import { TIPO_USER } from "./types/usuarios.js";
import { FileArray, UploadedFile } from 'express-fileupload';
import { Request } from "express";
import { EmptyInfoError } from "./models/errors/error_info.js";
const key: string = "CryptoKeyFromTheProjectCreatedByME_160603"

declare module 'express-session' {
    interface SessionData {
        usuario: {
            tipo: TIPO_USER,
            id: number,
            fullName: string
        }
    }
}

declare global {
  namespace Express {
    interface Request {
      files?: FileArray | null;
    }
  }
}

export function validate_users_id(id: string): boolean {
  return id !== "" && !isNaN(Number(id));
}

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

export const move_document: Function = ((req: Request)=> {
    if(!req.files) throw new Error("No se encuentra files entre los metodos del request");

    const img = req.files.img;

    if(!img) throw new EmptyInfoError("Hace falta de un archivo para poder guardarlo");
    if(Array.isArray(img)) throw new Error("Se espera solo un archivo");
    return ((path: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        img.mv(path, (err)=> {
          if(err) return reject(`Error al guardar el archivo: ${err}`);
          return resolve(`Se guardo la imagen en la sigueinte ruta: ${path}`);
        })
      })
    })
})