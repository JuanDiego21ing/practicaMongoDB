const express = require("express");
const router = express.Router();
const Cuenta = require("../models/Cuenta");
const Transaccion = require("../models/Transaccion");
const {
  realizarDeposito,
  realizarRetiro,
} = require("../controllers/transaccionesController");

// POST /api/deposito
router.post("/deposito", realizarDeposito, async (req, res) => {
  try {
    const { numeroCuenta, cantidad, sucursal } = req.body;

    if (cantidad <= 0) {
      return res.status(400).json({ error: "El monto debe ser mayor a 0." });
    }

    const cuenta = await Cuenta.findOne({ numeroCuenta });
    if (!cuenta) {
      return res.status(404).json({ error: "Cuenta no encontrada." });
    }

    cuenta.saldo += cantidad;
    await cuenta.save();

    const transaccion = new Transaccion({
      cuenta: cuenta._id,
      tipo: "deposito",
      cantidad,
      sucursal,
    });

    await transaccion.save();

    res.json({ mensaje: "Depósito exitoso.", saldo: cuenta.saldo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor." });
  }
});

// POST /api/retiro
router.post("/retiro", realizarRetiro, async (req, res) => {
  try {
    const { numeroCuenta, cantidad, sucursal } = req.body;

    if (cantidad <= 0) {
      return res.status(400).json({ error: "El monto debe ser mayor a 0." });
    }

    const cuenta = await Cuenta.findOne({ numeroCuenta });
    if (!cuenta) {
      return res.status(404).json({ error: "Cuenta no encontrada." });
    }

    if (cuenta.saldo < cantidad) {
      return res.status(400).json({ error: "Saldo insuficiente." });
    }

    cuenta.saldo -= cantidad;
    await cuenta.save();

    const transaccion = new Transaccion({
      cuenta: cuenta._id,
      tipo: "retiro",
      cantidad,
      sucursal,
    });

    await transaccion.save();

    res.json({ mensaje: "Retiro exitoso.", saldo: cuenta.saldo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error en el servidor." });
  }
});

module.exports = router;
