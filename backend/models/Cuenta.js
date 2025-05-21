// models/Cuenta.js
const mongoose = require('mongoose');

const cuentaSchema = new mongoose.Schema({
  cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cliente',
    required: true
  },
  numeroCuenta: {
    type: String,
    required: true,
    unique: true
  },
  tipo: {
    type: String,
    enum: ['ahorro', 'nomina', 'inversion'],
    required: true
  },
  saldo: {
    type: Number,
    required: true,
    default: 0
  },
  fechaCreacion: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cuenta', cuentaSchema);
