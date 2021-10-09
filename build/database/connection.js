"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("@avanda/error");
const sequelize_1 = require("sequelize");
async function default_1(config) {
    let connection = new sequelize_1.Sequelize(config.dbName, config.dbUser, config.dbPassword, {
        host: process.env.DB_HOST,
        dialect: config.dbDialect
    });
    try {
        await connection.authenticate({ logging: false });
    }
    catch (error) {
        throw new error_1.runtimeError('Unable to connect to the database:' + error);
    }
    return connection;
}
exports.default = default_1;
