const express = require('express');
const routes = express.Router();

// modelo de Datos
const mongoose = require('mongoose');
const esquema = mongoose.Schema;

const esquemaUsuario = new esquema({
    username: String,
    password: String,
    rol: String,
    name: String
});

const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // URL de tu frontend
    credentials: true
}));

app.use(cors());

module.exports = mongoose.model('users', esquemaUsuario);