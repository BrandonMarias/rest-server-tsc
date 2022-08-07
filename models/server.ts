import express, { Application } from "express";
import usuarioRoutes from "../routes/usuarios.routes";
import cors from "cors";
import db from "../db/connection";

class Server {
    private app: Application;
    private port: string;
    private apiPaths = {
        usuarios: "/api/usuarios",
    };

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8087";                
        this.middlewares();
        this.routes();
        this.dbConnection()
    }

    async dbConnection() {
        try {
            await db.authenticate();
            console.log("Base de datos MySql online");
        } catch (err) {
            console.log(err);
            throw new Error("Error en la base de datos");
            
        }
    }

    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static("public"));
    }

    routes() {
        this.app.use(this.apiPaths.usuarios, usuarioRoutes);
    }

    listener() {
        this.app.listen(this.port, () => {
            console.log("servidor corriendo en el puerto: " + this.port);
        });
    }
}

export default Server;
