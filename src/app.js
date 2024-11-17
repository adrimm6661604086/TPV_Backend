const express = require('express');
const bodyParser = require('body-parser');
const paymentRoutes = require('./routes/index.js');

const app = express();

app.use(bodyParser.json());
app.use('/api', paymentRoutes);

module.exports = app;
