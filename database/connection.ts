import { runtimeError } from "@avanda/error";
import {
  ConnectionError,
  ConnectionTimedOutError,
  Sequelize,
  TimeoutError,
} from "sequelize";
import Config from "../configs/dbConfig";
let connection: Sequelize;

export default async function (config: Config): Promise<Sequelize> {
  if (connection) {
    return connection;
  }

  connection = new Sequelize(config.dbName, config.dbUser, config.dbPassword, {
    host: config.dbHost,
    port: config.port,
    dialect: config.dbDialect,
    retry: {
      match: [
        ConnectionError,
        ConnectionTimedOutError,
        TimeoutError,
        /Deadlock/i,
        "SQLITE_BUSY",
      ],
      max: config.retry || 3,
    },
    logging: config.logging,
    dialectOptions:{
      ssl: config.ssl ? {
        require: true,
        rejectUnauthorized: false,
      }: undefined
    }
    
  });

  try {
    await connection.authenticate({ logging: config.logging });
  } catch (error) {
    throw new runtimeError("Unable to connect to the database:" + error);
  }

  return connection;
}
