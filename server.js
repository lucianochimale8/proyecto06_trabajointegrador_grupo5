const express = require('express');
const app = express();

// Configuración de endpoints
app.get('/',(req,res) => 
{
    res.end("Bienvenidos a el servidor Backend FPW 2025");
});

// Rutas
const archivosDB = require('./conection.js');
const usuarios = require('./src/model/usuarios.js');

// Middleware
app.use(express.json());
app.use('/api', usuarios);

// Servidor escuchando
app.listen(5000,() => 
{
    console.log("Servidor Node corriendo PERFECTAMENTE chml");
});
