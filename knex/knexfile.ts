import * as config from '../config/config';
export default {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
        host: config.db.host,
        port: config.db.port,
        user: config.db.user,
        database: config.db.database,
        password: config.db.password,
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