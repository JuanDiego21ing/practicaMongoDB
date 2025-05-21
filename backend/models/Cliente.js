const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  apellido: {
    type: String,
    required: true,
    trim: true
  },
  correo: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  telefono: {
    type: String,
    required: true
  },
  direccion: { 
    type: String,
    required: true
  },
  curp: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
}, {
  timestamps: true
});

module.exports = mongoose.model('Cliente', clienteSchema);
