export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '1h'
    },
    database: {
        DATABASE_URL: process.env.DATABASE_URL,
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD
    }
})