type dbConfig = {
    dbName: string,
    dbUser: string,
    dbPassword: string,
    dbDialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql'
}

export default dbConfig