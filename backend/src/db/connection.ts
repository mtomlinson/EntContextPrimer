import knex from 'knex';
import config from '../../knexfile';

// We are using the development configuration for now
const db = knex(config.development);

export default db;
