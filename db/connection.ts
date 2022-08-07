import { Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();
const  db =  new Sequelize("node","root",process.env.DBPASSWORD, {
    host: 'localhost',
    dialect: "mysql",
    // logging: false,
})

export default db;