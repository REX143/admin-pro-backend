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
app.use('/api/hospitales',require('./routes/hospitales.routes'));
app.use('/api/medicos',require('./routes/medico.routes'));
app.use('/api/todo',require('./routes/busqueda.routes'));
app.use('/api/login', require('./routes/auth.routes'));
app.use('/api/upload', require('./routes/uploads.routes'));


app.listen(process.env.PORT, ()=>{
    console.log('Servidor corriendo en puerto :' + process.env.PORT);
});