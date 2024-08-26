export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET || 'teste',
        signOptions: {
            expiresIn: process.env.JWT_TOKEN_EXPIRATION && process.env.JWT_TOKEN_EXPIRATION !== "0"
                ? process.env.JWT_TOKEN_EXPIRATION
                : "1h",
        }
    },
    db: {
        client: process.env.CLIENT || 'pg',
        user: process.env.DATABASE_USER || 'docker',
        password: process.env.DATABASE_PASSWORD || 'docker',
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || '5442',
        database: process.env.DATABASE || 'postegres',
        url: process.env.DATABASE_URL || "postgresql://docker:docker@localhost:5442/postgres?schema=public"
    }
})
