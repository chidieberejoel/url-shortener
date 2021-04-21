import migrate from "node-pg-migrate";
import format from "pg-format";
import pool from "../config/pool";
import opts from "./config";

class Context {
  static async build() {
    const { roleName } = opts;

    await pool.connect(opts.default);

    await pool.query(
      format("CREATE ROLE %I WITH LOGIN PASSWORD %L;", roleName, roleName),
    );

    await pool.query(
      format("CREATE SCHEMA %I AUTHORIZATION %I;", roleName, roleName),
    );

    await pool.close();

    await migrate({
      schema: opts.schema,
      direction: opts.direction,
      log: () => {},
      noLock: true,
      dir: opts.dir,
      databaseUrl: opts.options,
    });

    await pool.connect(opts.options);

    return new Context(roleName);
  }

  constructor(roleName) {
    this.roleName = roleName;
  }

  // eslint-disable-next-line class-methods-use-this
  async reset() {
    return pool.query(`
      DELETE FROM urls
    `);
  }

  async close() {
    await pool.close();

    await pool.connect(opts.default);

    await pool.query(format("DROP SCHEMA %I CASCADE;", this.roleName));
    await pool.query(format("DROP ROLE %I;", this.roleName));

    await pool.close();
  }
}

export default Context;
