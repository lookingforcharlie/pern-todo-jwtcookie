import pg from 'pg';

const { Pool } = pg;

export const pool = new Pool({
  user: 'postgres',
  password: '',
  database: 'pernstack',
  host: 'localhost',
  port: 5432,
});

// Now we can run queries on 'pool'
