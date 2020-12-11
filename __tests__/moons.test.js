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

  it('GET a single moon by id', async() => {
    const planet = await Planet.insert({
      name: 'Venus',
      size: 3760,
      fact: 'hottest planet'
    });

    const moon = await Moon.insert({
      name: 'Titan',
      planetId: planet.id
    });

    const response = await request(app)
      .get(`/api/moons/${moon.id}`);

    expect(response.body).toEqual({
      id: '1',
      name: 'Titan',
      planetId: planet.id
    });
  });

  it('PUT updates the moon information', async() => {
    const planet = await Planet.insert({
      name: 'Venus',
      size: 3760,
      fact: 'hottest planet'
    });
  
    const moon = await Moon.insert({
      name: 'Titan',
      planetId: planet.id
    });

    const response = await request(app)
      .put(`/api/moons/${moon.id}`)
      .send({
        name: 'the Moon',
        planetId: '1'
      });

    expect(response.body).toEqual({
      id: moon.id,
      name: 'the Moon',
      planetId: planet.id
    });
  
  });

  it('DELETE a moon from the solar system you monster', async() => {
    const planet = await Planet.insert({
      name: 'Venus',
      size: 3760,
      fact: 'hottest planet'
    });
    
    const moon = await Moon.insert({
      name: 'Titan',
      planetId: planet.id
    });

    const response = await request(app)
      .delete(`/api/moons/${moon.id}`);
    
    expect(response.body).toEqual({
      id: moon.id,
      name: 'Titan',
      planetId: planet.id
    });

  });
  

   
});
