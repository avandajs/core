import {runtimeError} from "@avanda/error";
import {Sequelize} from "sequelize";
import Config from "./config";

export default async function (config: Config): Promise<Sequelize> {

    let connection = new Sequelize(
        config.dbName,
        config.dbUser,
        config.dbPassword,
        {
            host: process.env.DB_HOST,
            dialect: config.dbDialect
        });

    try {
        await connection.authenticate({logging: false})
    }catch (error){
        throw new runtimeError('Unable to connect to the database:' + error)
    }

    return connection
}