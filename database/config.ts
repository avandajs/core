type Config = {
    dbName: string,
    dbUser: string,
    dbPassword: string,
    dbDialect: 'mysql' | 'mariadb' | 'postgres' | 'mssql'
}

export default Config