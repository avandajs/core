type dbConfig = {
    dbName: string,
    dbUser: string,
    dbPassword: string,
    dbDialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql',
    socketPath?: string
}

export default dbConfig