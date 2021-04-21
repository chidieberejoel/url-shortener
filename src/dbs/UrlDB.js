import pool from "../config/pool";
import camelCase from "../utils/camelCase";

class UrlDB {
  static async findByUrl(shortUrl) {
    const { rows } = await pool.query(
      "SELECT * FROM urls WHERE short_url = $1;",
      [shortUrl],
    );

    return camelCase(rows)[0];
  }

  static async insert(url, shortUrl) {
    const { rows } = await pool.query(
      "INSERT INTO urls (url, short_url) VALUES ($1, $2) RETURNING *;",
      [url, shortUrl],
    );

    return camelCase(rows)[0];
  }

  static async count() {
    const { rows } = await pool.query("SELECT COUNT (*) FROM urls;");

    return parseInt(rows[0].count, 10);
  }
}

export default UrlDB;
