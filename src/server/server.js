const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const colors = require('colors');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const puerto = process.env.EXPRESS_PORT || 8888;

// Configurar CORS
app.use(cors());

// Conexión a MongoDB
const mongoURL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/mascotas';
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Conectado a MongoDB'.bgWhite.magenta))
    .catch(error => console.error('Error al conectar con MongoDB:', error.message));

// Middleware para aceptar datos JSON
app.use(express.json());

// Middleware para servir archivos estáticos
app.use('/images', express.static(path.join(__dirname, '../../public/images')));

// Rutas
const productsRoutes = require('./routes/productsRoutes');
app.use('/api/v1/products/', productsRoutes);
const usersRoutes = require('./routes/usuarioRoute');
app.use('/api/v1/devcamps/usuarios', usersRoutes);
const compraRoutes = require('./routes/compraRoute');
app.use('/api/v1/devcamps/compras', compraRoutes);
// Iniciar el servidor
app.listen(puerto, () => {
    console.log(`El servidor se ha iniciado en el puerto ${puerto}`.bgWhite.magenta);
});