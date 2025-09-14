import express, { Express, Request, Response } from "express";
import fileUpload from "express-fileupload";
import session from "express-session";
import user_route from "../routes/user.routes.js";

class Server {
    constructor(private port: number, private app: Express = express()) {
        this.setMdw();
        this.setRoutes();
    }

    private setMdw(): void {
        this.app.use(express.json())
        this.app.use(session({
            secret: "llav3_de_PruebaENloqueS3Est4Pr0BanDp",
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: false,
                path: "*"
            }
        }))
        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 *1024 }
        }))
        
        // this.app.use(()=>console.log("C papu"));
    }

    private setRoutes(): void {
        this.app.get("/", (req: Request, res: Response)=> res.send("prueba"))
        this.app.use(user_route);
    }

    public listen() {
        this.app.listen(this.port, ()=> {
            console.log(`Escuchando en el puerto: ${this.port}`)
        })
    }
}

export default Server