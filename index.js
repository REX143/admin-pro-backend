require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// Creamos el servidor de express
const app = express();

// Configurar CORS
app.use(cors());

// Midleware para lectura y parseo del body
app.use( express.json());

// Base de datos
dbConnection();

// Rutas
app.use('/api/usuarios', require('./routes/usuario.routes'));
app.use('/api/login', require('./routes/auth.routes'));


app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto :' + process.env.PORT);
});