const db = require('./src/db/connection').default;

module.exports = async () => {
  await db.migrate.latest();
};