const path = require('path');

module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(__dirname, 'src', 'db', 'dev.sqlite3')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(__dirname, 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.resolve(__dirname, 'src', 'db', 'seeds')
    }
  },
};
