const express = require("express");
const router = express.Router();

const Cuenta = require("../models/Cuenta");
const Transaccion = require("../models/Transaccion");
const Cliente = require("../models/Cliente");

// GET /api/cuenta/:numeroCuenta
router.get("/:numeroCuenta", async (req, res) => {
  console.log("Petición GET /api/cuenta/:numeroCuenta recibida con número:", req.params.numeroCuenta);
  try {
    const cuenta = await Cuenta.findOne({
      numeroCuenta: req.params.numeroCuenta,
    }).populate("cliente");
    if (!cuenta) return res.status(404).json({ error: "Cuenta no encontrada" });

    const transacciones = await Transaccion.find({ cuenta: cuenta._id }).sort(
      { fecha: -1 }
    );

    res.json({
      cliente: `${cuenta.cliente.nombre} ${cuenta.cliente.apellido}`,
      curp: cuenta.cliente.curp,
      numeroCuenta: cuenta.numeroCuenta,
      saldo: cuenta.saldo,
      transacciones: transacciones,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error del servidor" });
  }
});

module.exports = router;
