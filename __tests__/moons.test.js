const request = require('supertest');
const app = require('../lib/app.js');
const pool = require('../lib/utils/pool.js');
const fs = require('fs');
const Planet = require('../lib/models/Planets.js');
const Moon = require('../lib/models/Moons.js');


describe('moons tests', () => {
  beforeEach(() => { pool.query(fs.readFileSync('./sql/setup.sql', 'utf-8'));
    
  });
    
  afterAll(() => {
    return pool.query.end();
  });

  it('POST a moon to the table', async() => {
    const planet = await Planet.insert({
      name: 'Venus',
      size: 3760,
      fact: 'hottest planet'
    });
    const response = await request(app)
      .post('/api/moons')
      .send({ 
        name: 'Titan',
        planetId: planet.id
      });

    expect(response.body).toEqual({
      id: '1',
      name: 'Titan',
      planetId: planet.id
    });

  });
  
  it('GET all moons from the planet', async() => {
    const planet = await Planet.insert({
      name: 'Venus',
      size: 3760,
      fact: 'hottest planet'
    });
    
    const moons = await Promise.all([
      { 
        name: 'Titan',
        planetId: planet.id 
      },
      {
        name: 'Io',
        planetId: planet.id
      }
    ].map(moon => Moon.insert(moon)));

    const response = await request(app)
      .get('/api/moons');

    expect(response.body).toEqual(expect.arrayContaining(moons));
    expect(response.body).toHaveLength(moons.length);
  });

   
});
