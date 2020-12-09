const pool = require('../utils/pool.js');

module.exports = class Planet {
    id;
    name;
    size;
    fact;

    constructor(row) {

      this.id = row.id;
      this.name = row.name;
      this.size = row.size;
      this.fact = row.fact;

    }

    static async insert({ name, size, fact }) {
      const { rows } = await pool.query(
        'INSERT INTO planets (name, size, fact) VALUES ($1, $2, $3) RETURNING *',
        [name, size, fact]
      );

      return new Planet(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query('SELECT * FROM planets');
      return rows.map(row => new Planet(row));
    }
};
