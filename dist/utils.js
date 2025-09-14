import CryptoJS from "crypto-js";
import { EmptyInfoError } from "./models/errors/error_info.js";
const key = "CryptoKeyFromTheProjectCreatedByME_160603";
export function validate_users_id(id) {
    return id !== "" && !isNaN(Number(id));
}
export function validate_email(correo) {
    if (!correo.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
        return false;
    return true;
}
export function encode(thing_to_encode) {
    return CryptoJS.AES.encrypt(thing_to_encode, key).toString();
}
export function decode(thing_to_decode) {
    return CryptoJS.AES.decrypt(thing_to_decode, key).toString(CryptoJS.enc.Utf8);
}
export const move_document = ((req) => {
    if (!req.files)
        throw new Error("No se encuentra files entre los metodos del request");
    const img = req.files.img;
    if (!img)
        throw new EmptyInfoError("Hace falta de un archivo para poder guardarlo");
    if (Array.isArray(img))
        throw new Error("Se espera solo un archivo");
    return ((path) => {
        return new Promise((resolve, reject) => {
            img.mv(path, (err) => {
                if (err)
                    return reject(`Error al guardar el archivo: ${err}`);
                return resolve(`Se guardo la imagen en la sigueinte ruta: ${path}`);
            });
        });
    });
});
