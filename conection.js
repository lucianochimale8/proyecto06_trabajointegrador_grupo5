// Creo mongoose para requerir de la libreria
const mongoose = require('mongoose');

// Link al cluster
mongoose.connect("mongodb+srv://admin:EgUHBMrXvTlpHaHm@trabajofinalfpwgrupo5.twun9p8.mongodb.net/?appName=TrabajoFinalFPWGrupo5");

// Creo un objeto con la conexion de mongoose
const object = mongoose.connection;

// Comprobar si el objeto esta corriendo correctamente
object.on('connected', () => {
  console.log("Conectado a la BD Mongo FPW 2025");
});

object.on('error', (err) => {
  console.error('Se produjo un error en la conexion con MongoDB:', err);
});

module.exports = mongoose;