const express = require('express');
const Moon = require('./models/Moons.js');
const Planet = require('./models/Planets.js');
const app = express();

app.use(express.json());

app.post('/api/planets', (req, res, next) => {
  Planet
    .insert(req.body)
    .then(planet => res.send(planet))
    .catch(next);
});

app.post('/api/moons', (req, res, next) => {
  Moon
    .insert(req.body)
    .then(moon => res.send(moon))
    .catch(next);
});

app.get('/api/planets', (req, res, next) => {
  Planet
    .find()
    .then(planets => res.send(planets))
    .catch(next);
});

app.get('/api/moons', (req, res, next) => {
  Moon
    .find()
    .then(moons => res.send(moons))
    .catch(next);
});

app.get('/api/planets/:id', (req, res, next) => {
  Planet
    .findById(req.params.id, req.body)
    .then(planet => res.send(planet))
    .catch(next);
});

app.get('/api/moons/:id', (req, res, next) => {
  Moon
    .findById(req.params.id, req.body)
    .then(moon => res.send(moon))
    .catch(next);
});

app.put('/api/planets/:id', (req, res, next) => {
  Planet
    .update(req.params.id, req.body)
    .then(planet => res.send(planet))
    .catch(next);
});

app.put('api/moons/:id', (req, res, next) => {
  Moon
    .update(req.params.id, req.body)
    .then(moon => res.send(moon))
    .catch(next);
});

app.delete('/api/planets/:id', (req, res, next) => {
  Planet
    .delete(req.params.id)
    .then(planet => res.send(planet))
    .catch(next);
});

app.delete('/api/moons/:id', (req, res, next) => {
  Moon
    .delete(req.params.id)
    .then(moon => res.send(moon))
    .catch(next);
});

module.exports = app;
