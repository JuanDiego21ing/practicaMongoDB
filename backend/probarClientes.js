const mongoose = require('mongoose');
const Cliente = require('./models/Cliente');  // Ajusta la ruta según tu estructura
const connectDB = require('./config/db');    // Ajusta según tu archivo de conexión

async function probar() {
  try {
    await connectDB();  // Conecta a la BD
    const clientes = await Cliente.find();
    console.log('Clientes encontrados:', clientes.length);
    console.log(clientes);
    process.exit(0);
  } catch (error) {
    console.error('Error en prueba:', error);
    process.exit(1);
  }
}

probar();
