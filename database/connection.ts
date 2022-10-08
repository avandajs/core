import {runtimeError} from "@avanda/error";
import {Sequelize} from "sequelize";
import Config from "../configs/dbConfig";
let connection: Sequelize;

export default async function (config: Config): Promise<Sequelize> {

    if (connection) {
        return connection;
    }
    connection = new Sequelize(
        config.dbName,
        config.dbUser,
        config.dbPassword,
        {
            host: process.env.DB_HOST,
            port: config.port,
            dialect: config.dbDialect
        });

    try {
        await connection.authenticate({logging: config.logging})
    }catch (error){
        throw new runtimeError('Unable to connect to the database:' + error)
    }

    return connection
}