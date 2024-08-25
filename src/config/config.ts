export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET || 'teste',
        signOptions: {
            expiresIn: process.env.JWT_TOKEN_EXPIRATION && process.env.JWT_TOKEN_EXPIRATION !== "0"
                ? process.env.JWT_TOKEN_EXPIRATION
                : "1h",
        }
    },
    init: process.env.INIT || 'Default'
    // database: {
    //     DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://localhost:5442/postgres",
    //     DATABASE_USER: process.env.DATABASE_USER ?? "docker",
    //     DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? "docker"
    // }
})