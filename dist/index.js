import DBPostgre from "./config/db.js";
import Server from "./config/server.js";
import Cliente from "./models/clientes/clientes.js";
import { ClienteRepository } from "./models/clientes/clientes_repository.js";
import { ESTATUS_CLIENTE } from "./types/clientes.js";
let servidor = new Server(5000);
let postgre = new DBPostgre();
let cliente1 = new Cliente("Néstor Iván", "Balderas Soto", "basn160603@gmail.com", "8333134273", ESTATUS_CLIENTE.ACTIVO);
let cliente_repo = new ClienteRepository(postgre);
(async () => {
    // console.log(cliente1.getAllData())
    // let data: Array<ClienteDatos|void> = await cliente_repo.getAll();
    // console.table(data)
    // await cliente_repo.eliminar(2);
})();
servidor.listen();
