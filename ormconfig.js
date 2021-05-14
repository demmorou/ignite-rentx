require('dotenv').config()

const basePath = process.env.NODE_ENV === 'production' ? './build' : './src';

module.exports = [
  {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
  
    entities: [`${basePath}/modules/**/entities/*.{js,ts}`],
    migrations: [`${basePath}/database/migrations/*.{js,ts}`],
  
    cli: {
      migrationsDir: `${basePath}/database/migrations`,
    },
  }
];
