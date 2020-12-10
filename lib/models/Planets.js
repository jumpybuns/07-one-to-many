const pool = require('../utils/pool.js');
const Moon = require('./Moons');


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

    static async findById(id) {
      const { rows } = await pool.query(`SELECT planets.*,
      array_to_json(array_agg(moons.*)) AS moons
      FROM
      planets
      JOIN moons
      ON planets.id = moons.planet_id
      WHERE planets.id=$1
      GROUP BY planets.id
      `, 
      [id]
      );

      if(!rows[0]) throw new Error(`No planets with id ${id} found`);

      return {
        ...new Planet(rows[0]),
        moons: rows[0].moons.map(moon => new Moon(moon))
      };
    }

    static async update(id, { name, size, fact }) {
      const { rows } = await pool.query(
        `UPDATE planets
        SET name=$1,
        size=$2,
        fact=$3
        WHERE id=$4
        RETURNING *`,
        [name, size, fact, id]
      );

      if(!rows[0]) throw new Error(`No planet with that ${id} found`);
      return new Planet(rows[0]);
      
    }

    static async delete(id) {
      const { rows } = await pool.query(
        'DELETE FROM planets WHERE id=$1 RETURNING *',
        [id]
      );

      return new Planet(rows[0]);
    }
};
