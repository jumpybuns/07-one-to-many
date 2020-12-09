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


module.exports = app;
