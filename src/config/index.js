import dotenv from "dotenv";

dotenv.config();

export default {
  nodeEnv: process.env.NODE_ENV,
  port: process.env.NODE_PORT,
  dir: process.env.MIGRATIONS_DIR,
  direction: process.env.MIGRATIONS_DIRECTION,
  hostUrl: process.env.HOST_URL,
  development: {
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
  },
  production: {
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  },
};
