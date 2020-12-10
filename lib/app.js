// const { request } = require('express');
const express = require('express');
const Planet = require('./models/Planets.js');
const app = express();

app.use(express.json());

app.post('/api/planets', (req, res, next) => {
  Planet
    .insert(req.body)
    .then(planet => res.send(planet))
    .catch(next);
});

app.get('/api/planets', (req, res, next) => {
  Planet
    .find()
    .then(planets => res.send(planets))
    .catch(next);
});

app.get('/api/planets/:id', (req, res, next) => {
  Planet
    .findById(req.params.id, req.body)
    .then(planet => res.send(planet))
    .catch(next);
});

app.put('/api/planets/:id', (req, res, next) => {
  Planet
    .update(req.params.id, req.body)
    .then(planet => res.send(planet))
    .catch(next);
});


module.exports = app;
