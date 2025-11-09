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

const app = express();

// Configurar CORS
app.use(cors({
    origin: 'http://localhost:5173', // URL de tu frontend
    credentials: true
}));

// O si quieres permitir todos los orígenes (solo desarrollo)
app.use(cors());

module.exports = mongoose.model('users', esquemaUsuario);