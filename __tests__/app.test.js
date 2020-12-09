const request = require('supertest');
const app = require('../lib/app.js');
const pool = require('../lib/utils/pool.js');
const fs = require('fs');
// const Planets = require('../lib/models/Planets.js');


describe('app tests', () => {
  beforeEach(() => {
    return pool.query(fs.readFileSync(`${__dirname}/../sql/setup.sql`, 'utf-8'));
  });
  afterAll(() => {
    return pool.query.end();
  });

  it('POST a planet to the universe', async() => {
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


});
