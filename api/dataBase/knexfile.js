import dotenv from 'dotenv';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({path: __dirname + './../.env'});


export default {
    client: "postgresql",
    connection: {
      database: process.env.DEV_DATABASE_NAME,
      host: "localhost",
      user: process.env.DEV_DATABASE_USERNAME,
      password: process.env.DEV_DATABASE_PASSWORD,
      port: process.env.DEV_DATABASE_PORT,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "migrations",
      directory: "./migrations",
    },
    seeds: {
      directory: "./seeds",
    },
};
