const express = require('express');
const app = express();

// endpoint metodos get o post
app.get('/',(req,res) => 
{
    res.end("Bienvenidos a el servidor Backend FPW 2025");
});

//routing
const archivosDB = require('./conection.js');
const usuarios = require('./src/model/usuarios.js');

//midleware
app.use('/api', usuarios);

//listening
app.listen(5000,() => 
{
    console.log("Servidor Node corriendo PERFECTAMENTE chml");
});
