export function hasPermission(permited_types) {
    return (req, res, next) => {
        const user_type = req.session.usuario?.tipo;
        if (user_type && permited_types.includes(user_type))
            return next();
        return res.status(403).json({ estatus: 0, message: "El usuario no tiene permisos" });
    };
}
