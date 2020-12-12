const pool = require('../utils/pool');

module.exports = class Moon {
    id;
    name;
    planetId;

    constructor(row) {
      this.id = String(row.id);
      this.name = row.name;
      this.planetId = String(row.planet_id);
    }

    static async insert({ name, planetId }) {
      const { rows } = await pool.query(
        'INSERT INTO moons (name, planet_id) VALUES ($1, $2) RETURNING *', 
        [name, planetId]
      );

      return new Moon(rows[0]);
    }

    static async find() {
      const { rows } = await pool.query(
        'SELECT * FROM moons');
      
      return rows.map(row => new Moon(row));
    }

    static async findById(id) {
      const { rows } = await pool.query(`
      SELECT * FROM moons WHERE id=$1`,
      [id]
      );

      return new Moon(rows[0]);
    }

    static async update(id, { name }) {
      const { rows } = await pool.query(`
      UPDATE moons
      SET 
      name=$1
      WHERE
      id=$2
      RETURNING *`,
      [name, id]);

      return new Moon(rows[0]);
    }

    static async delete(id) {
      const { rows } = await pool.query('DELETE FROM moons WHERE id=$1 RETURNING *', [id]);

      return new Moon(rows[0]);
    }

};
