const mongoose = require('mongoose');

const transaccionSchema = new mongoose.Schema({
  cuenta: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cuenta',
    required: true
  },
  tipo: {
    type: String,
    enum: ['deposito', 'retiro'],
    required: true
  },
  cantidad: {
    type: Number,
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now 
  },
  sucursal: {
    type: String, 
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaccion', transaccionSchema);
