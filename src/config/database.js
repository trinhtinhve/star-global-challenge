require('dotenv').config();

module.exports = {
  development: {
    username: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    database: 'star_global',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },
  test: {
    username: 'postgres',
    password: process.env.POSTGRES_PASSWORD,
    database: 'star_global_test',
    host: '127.0.0.1',
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      bigNumberStrings: true
    },
    logging: false
  },
  production: {
    username: process.env.PROD_DB_USERNAME,
    password: process.env.PROD_DB_PASSWORD,
    database: process.env.PROD_DB_NAME,
    host: process.env.PROD_DB_HOSTNAME,
    port: process.env.PROD_DB_PORT,
    dialect: 'postgres',
    dialectOptions: {}
  }
};
