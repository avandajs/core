import {Sequelize} from "sequelize";

type serverConfig = {
    connection: Sequelize,
    port: string | number,
    rootPath: string
}

export default serverConfig