require('./config/config');
const express = require('express');
const mongoose = require('mongoose');
const colors = require('colors');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json.
app.use(bodyParser.json());

// Configuracion global de rutas.
app.use(require('./routes/index'));

// Conexion a la base de datos de MongoDB
mongoose.connect(process.env.URLDB, (err, res) => {
   if( err ) throw new Error('Base de datos'.green+' '+'OFFLINE'.yellow);
   console.log("base de datos".green+" "+"ONLINE".yellow);
});

// Escuchando el puerto
app.listen(process.env.PORT, () => console.log("Escuchando puerto: ".green, process.env.PORT.yellow) );
