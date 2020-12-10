const pool = require('../utils/pool');

module.exports = class Moon {
    id;
    name;
    planetId;

    constructor(row) {
      this.id = String(row.id);
      this.name = row.name;
      this.planetId = String(row.planet_Id);
    }

    static async insert({ name, planetId }) {
      const { rows } = await pool.query(
        'INSERT INTO moons (name, planet_id) VALUES ($1, $2) RETURNING *', 
        [name, planetId]
      );

      return new Moon(rows[0]);
    }

};
