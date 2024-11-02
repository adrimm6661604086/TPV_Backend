var express = require('express'); 
var app = express();               
var PORT = process.env.PORT || 8080 ;

app.get('/', function(req, res) {
  res.json({ mensaje: '¡Hola Mundo!' })   
});

// app.post('/', function(req, res) {
//   res.json({ mensaje: 'Método post' })   
// })

// app.del('/', function(req, res) {
//   res.json({ mensaje: 'Método delete' })  
// })

app.listen(PORT, () => {
    console.log(`TPV Backend server ejecutándose en http://localhost:${PORT}`)
})
