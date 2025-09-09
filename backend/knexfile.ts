import type { Knex } from 'knex';
import path from 'path';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: path.resolve(process.cwd(), 'src', 'db', 'dev.sqlite3')
    },
    useNullAsDefault: true,
    migrations: {
      directory: path.resolve(process.cwd(), 'src', 'db', 'migrations')
    },
    seeds: {
      directory: path.resolve(process.cwd(), 'src', 'db', 'seeds')
    }
  },
  // production configuration can be added here later
};

export default config;
