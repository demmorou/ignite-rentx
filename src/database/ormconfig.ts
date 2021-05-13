import { ConnectionOptions } from 'typeorm';

const basePath = process.env.NODE_ENV === 'production' ? './build' : './src';

const connection: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,

  entities: [`${basePath}/modules/**/model/*.{js,ts}`],
  migrations: [`${basePath}/database/migrations/*.{js,ts}`],

  cli: {
    migrationsDir: `${basePath}/database/migrations`,
  },
};

module.exports = connection;
