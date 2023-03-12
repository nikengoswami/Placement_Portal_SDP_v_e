module.exports = {
    HOST: process.env.NODE_ENV == "production" ? process.env.DB_HOST : "localhost",
    USER: process.env.NODE_ENV == "production" ? process.env.DB_USERNAME : "root",
    PASSWORD: process.env.NODE_ENV == "production" ? process.env.DB_PASSWORD : "",
    DB: process.env.NODE_ENV == "production" ? process.env.DB_NAME : "sequelize_testing",
    DIALECT: 'mysql',
}