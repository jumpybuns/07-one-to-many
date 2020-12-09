const request = require('supertest');
const app = require('../lib/app.js');
const pool = require('../lib/utils/pool.js');
const fs = require('fs');
const Planet = require('../lib/models/Planets.js');


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
    

});
