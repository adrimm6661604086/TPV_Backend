import dotenv from 'dotenv';
dotenv.config();

export const PORT = process.env.PORT || 5000;
export const BANK_API_URL = process.env.BANK_API_URL;
export const BANK_API_KEY = process.env.BANK_API_KEY;
export const DATABASE_URL = process.env.DATABASE_URL;
export const DB_HOST = process.env.DB_HOST;
export const DB_USER = process.env.DB_USER;
export const DB_PASSWORD = process.env.DB_PASSWORD;
export const DB_NAME = process.env.DB_NAME;
export const DB_PORT = process.env.DB_PORT;
export const DB_SERVER = process.env.DB_SERVER;
export const JWT_SECRET = process.env.JWT_SECRET;
