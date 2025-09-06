export function validate_email(correo) {
    if (!correo.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/))
        return false;
    return true;
}
