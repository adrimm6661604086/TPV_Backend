const express = require('express');
const app = express();
const bodyParser = require('body-parser');  
const router = require('./Routes/index.js');

const PORT = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json()) 


app.use('/api', router);

app.get('/', function(req, res) {
  res.json({ mensaje: '¡Bienvenido al servidor de TPV Virtual!' })   
});

app.listen(PORT, () => {
  console.log(`TPV Backend server ejecutándose en http://localhost:${PORT}`)
})

