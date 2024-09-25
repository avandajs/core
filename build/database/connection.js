"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("@avanda/error");
const sequelize_1 = require("sequelize");
let connection;
async function default_1(config) {
    if (connection) {
        return connection;
    }
    connection = new sequelize_1.Sequelize(config.dbName, config.dbUser, config.dbPassword, {
        host: config.dbHost,
        port: config.port,
        dialect: config.dbDialect,
        retry: {
            match: [
                sequelize_1.ConnectionError,
                sequelize_1.ConnectionTimedOutError,
                sequelize_1.TimeoutError,
                /Deadlock/i,
                "SQLITE_BUSY",
            ],
            max: config.retry || 3,
        },
        logging: config.logging,
        dialectOptions: {
            ssl: config.ssl ? {
                require: true,
                rejectUnauthorized: false,
            } : undefined
        }
    });
    try {
        await connection.authenticate({ logging: config.logging });
    }
    catch (error) {
        throw new error_1.runtimeError("Unable to connect to the database:" + error);
    }
    return connection;
}
exports.default = default_1;
