import express from "express";
import fileUpload from "express-fileupload";
import session from "express-session";
class Server {
    port;
    app;
    constructor(port, app = express()) {
        this.port = port;
        this.app = app;
        this.setMdw();
    }
    setMdw() {
        this.app.use(session({
            secret: "llav3_de_PruebaENloqueS3Est4Pr0BanDp",
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                path: "*"
            }
        }));
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 }
        }));
        this.app.use(() => console.log("C papu"));
    }
    setRoutes(app) {
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando en el puerto: ${this.port}`);
        });
    }
}
export default Server;
