const Sequelize = require('sequelize');
const config = require('config');

const { username, database, host, port, dialect } = config.get('sequelize');

const sequelize = new Sequelize(database, username, process.env.POSTGRES_PASSWORD, {
  host,
  port,
  dialect,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const ensureConnected = () => {
  return sequelize
    .authenticate();
};

module.exports = {
  sequelize,
  ensureConnected
}
