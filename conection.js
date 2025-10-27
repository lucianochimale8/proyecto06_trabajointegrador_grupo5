const mongoose = require('mongoose');
mongoose.connect

{"mongodb+srv://lucianochimale8_db_user:0kL8MDMurSxGdQAZ@cluster0.pqn2ojx.mongodb.net/tudivj?retryWrite=true&w=majority&appName=Cluster0"}

const objeto = mongoose.connection;

objeto.on('connected', () =>
{
    console.log("Conectadi a la BD Mongo FPW 2025");
});
objeto.on('error', () =>
{
    console.log("Se produjo un error en la conexion con MongoDB");
});

module.exports = mongoose;