import knex from 'knex';
import config from '../../knexfile.js';

// We are using the development configuration for now
const db = knex(config.development);

export default db;
