type dbConfig = {
    dbName: string,
    dbUser: string,
    dbHost: string,
    dbPassword: string,
    dbDialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql',
    socketPath?: string,
    port?: number,
    retry?: number,
    ssl?: boolean,
    timeout?: number,
    logging?: boolean | ((sql: string, timing?: number) => void);
}

export default dbConfig 