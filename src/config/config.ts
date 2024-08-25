export default () => ({
    jwt: {
        secret: process.env.JWT_SECRET || 'teste',
        signOptions: {
            expiresIn: process.env.JWT_TOKEN_EXPIRATION && process.env.JWT_TOKEN_EXPIRATION !== "0"
                ? process.env.JWT_TOKEN_EXPIRATION
                : "1h",
        }
    }
})