import express from "express";
class Server {
    port;
    app;
    constructor(port, app = express()) {
        this.port = port;
        this.app = app;
        this.setMdw();
    }
    setMdw() {
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
