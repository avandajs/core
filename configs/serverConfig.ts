import {Sequelize} from "sequelize";

type serverConfig = {
    connection: Sequelize | Promise<Sequelize>,
    port: string | number,
    rootPath: string,
    CORSWhitelist: string[]
}

export default serverConfig