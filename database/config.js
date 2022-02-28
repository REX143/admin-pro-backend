// Credenciales mongoatlas
// mean_user
// izZQtc7GmvixUeqL

const mongoose = require('mongoose');

const dbConnection = async() => {

    try {

    await mongoose.connect( process.env.DB_CNN, {
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useCreateIndex: true
    });    
        console.log('DB Online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la bd. Revisar el log.');
    }

}

module.exports = {dbConnection}