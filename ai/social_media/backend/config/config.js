require('dotenv').config()
const port = process.env.PORT;
const authServerPort = process.env.AUTH_SERVER_PORT;
const localMongoUri = process.env.LOCAL_MONGO_URI;
const mongoUri = process.env.MONGO_URI;
const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET;
const jwtExpire = process.env.JWT_EXPIRE;
const jwtRefreshExpire = process.env.JWT_REFRESH_EXPIRE;

module.exports = {
    port,
    authServerPort,
    localMongoUri,
    mongoUri,
    accessTokenSecret,
    refreshTokenSecret,
    jwtExpire,
    jwtRefreshExpire
}
