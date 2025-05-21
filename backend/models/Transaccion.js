// models/Transaccion.js
const mongoose = require('mongoose');

const transaccionSchema = new mongoose.Schema({
  cuenta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuenta',
    required: true
  },
  tipo: {
    type: String,
    enum: ['ingreso', 'retiro', 'transferencia'],
    required: true
  },
  monto: {
    type: Number,
    required: true
  },
  descripcion: {
    type: String
  },
  fecha: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaccion', transaccionSchema);
