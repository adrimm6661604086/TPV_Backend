require('dotenv').config();

module.exports = {
    PORT: process.env.PORT || 3000,
    BANK_API_URL: process.env.BANK_API_URL,
    BANK_API_KEY: process.env.BANK_API_KEY,

    DATABASE_URL: process.env.DATABASE_URL,
    DB_HOST: process.env.DB_HOST,
    DB_USER: process.env.DB_USER,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT: process.env.DB_PORT,
    DB_SERVER: process.env.DB_SERVER,
};
