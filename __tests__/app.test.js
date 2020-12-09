const request = require('supertest');
const app = require('../lib/app.js');
const pool = require('../lib/utils/pool.js');
const fs = require('fs');
const Planet = require('../lib/models/Planets.js');
const Moon = require('../lib/models/Moons.js');



describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync(`${__dirname}/../sql/setup.sql`, 'utf-8'));
  });
  afterAll(() => {
    return pool.query.end();
  });

  it('POST a planet to the solar system', async() => {
    const response = await request(app)
      .post('/api/planets')
      .send({
        name: 'Venus',
        size: 3760,
        fact: 'hottest planet'
      });

    expect(response.body).toEqual({
      id: '1',
      name: 'Venus',
      size: 3760,
      fact: 'hottest planet'

    });
  });

  it('GET all the planets from our solar system', async() => {
    const planet = await Planet.insert({
      name: 'Venus',
      size: 3760,
      fact: 'hottest planet'
    });

    const response = await request(app)

      .get('/api/planets');

    expect(response.body).toEqual([planet]);

  });

  it('GET a single planet by id', async() => {
    const planet = await Planet.insert({
      name: 'Venus',
      size: 3760,
      fact: 'hottest planet'
    });
    
    const moons = await Promise.all([
      { name: 'Phobos', planetId: planet.id },
      { name: 'Deimos', planetId: planet.id }
    ].map(moon => Moon.insert(moon)));

    const response = await request(app)
      .get(`/api/planets/${planet.id}`);

    expect(response.body).toEqual({
      ...planet,
      moons: expect.arrayContaining(moons)
    });
    
  });

  it('PUT to update the info on a planet', async() => {
    const planet = await Planet.insert({
      name: 'Venus',
      size: 3760,
      fact: 'hottest planet'
    });

    const response = await request(app)
      .put(`/api/planets/${planet.id}`)
      .send({
        name: 'Venus',
        size: 3760,
        fact: 'stupidest planet'
      });

    expect(response.body).toEqual({
      name: 'Venus',
      size: 3760,
      fact: 'stupidest planet'
    });
  });
});
