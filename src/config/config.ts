export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h'
    },
    database: {
        DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://localhost:5442/postgres",
        DATABASE_USER: process.env.DATABASE_USER ?? "docker",
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD ?? "docker"
    }
})