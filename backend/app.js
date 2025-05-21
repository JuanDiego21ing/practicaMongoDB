const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const connectDB = require('./config/db');

const cuentaRouter = require('./routes/cuenta');

const app = express();

// Conexión a la base de datos
connectDB();

// Middlewares
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas personalizadas
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/cuenta', cuentaRouter);

// 🔧 Estas rutas están comentadas porque los archivos no existen aún
// app.use('/api/cuentas', require('./routes/cuentas'));
// app.use('/api/transacciones', require('./routes/transacciones'));



module.exports = app;
