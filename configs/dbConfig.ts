type dbConfig = {
    dbName: string,
    dbUser: string,
    dbPassword: string,
    dbDialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql',
    socketPath?: string,
    port?: number,
    logging?: boolean | ((sql: string, timing?: number) => void);
}

export default dbConfig