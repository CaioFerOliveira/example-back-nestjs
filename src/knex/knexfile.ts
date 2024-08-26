export default {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host: process.env.HOST || 'localhost',
        port: parseInt(process.env.PORT ?? '5442') || 5442,
        user: process.env.DATABASE_USER || 'docker',
        database: process.env.DATABASE || 'postgres',
        password: process.env.DATABASE_PASSWORD || 'docker',
        ssl: process.env.SSL === 'true' ? { rejectUnauthorized: false } : false,
    },
    pool: { min: 2, max: 10 },
    acquireConnectionTimeout: 60000,
    migrations: {
        tableName: 'migrations',
        extension: 'ts',
    },
    seeds: {
        directory: './seeds',
    },
};