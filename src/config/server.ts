import express, { Express } from "express";
import session from "express-session";

class Server {
    constructor(private port: number, private app: Express = express()) {
        this.setMdw();
    }

    private setMdw(): void {
        this.app.use(session({
            secret: "llav3_de_PruebaENloqueS3Est4Pr0BanDp",
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                path: "*"
            }
        }))
        this.app.use(()=>console.log("C papu"));
    }

    private setRoutes(app: Function): void {
    }

    public listen() {
        this.app.listen(this.port, ()=> {
            console.log(`Escuchando en el puerto: ${this.port}`)
        })
    }
}

export default Server