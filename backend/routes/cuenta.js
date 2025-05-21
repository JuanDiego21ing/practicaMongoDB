const express = require('express');
const router = express.Router();
const Cliente = require('../models/Cliente');
const Cuenta = require('../models/Cuenta');
const Transaccion = require('../models/Transaccion');

// GET /api/cuenta/:numeroCuenta
router.get('/:numeroCuenta', async (req, res) => {
  try {
    const numeroCuenta = req.params.numeroCuenta;

    const cuenta = await Cuenta.findOne({ numero: numeroCuenta }).populate('clienteId');
    if (!cuenta) {
      return res.status(404).json({ mensaje: 'Cuenta no encontrada' });
    }

    const transacciones = await Transaccion.find({ cuentaId: cuenta._id }).sort({ fecha: -1 });

    res.json({
      cliente: {
        nombre: cuenta.clienteId.nombre,
        curp: cuenta.clienteId.curp,
        correo: cuenta.clienteId.correo,
      },
      cuenta: {
        numero: cuenta.numero,
        tipo: cuenta.tipo,
        saldo: cuenta.saldo,
      },
      transacciones,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener los datos de la cuenta' });
  }
});

module.exports = router;

