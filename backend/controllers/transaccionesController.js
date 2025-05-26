const Cuenta = require("../models/Cuenta");
const Transaccion = require("../models/Transaccion");

// backend/controllers/transaccionesController.js

exports.realizarDeposito = async (req, res) => {
  try {
    const { numeroCuenta, cantidad, sucursal } = req.body;

    // --- NUEVAS VALIDACIONES AQUÍ ---
    if (
      !numeroCuenta ||
      typeof numeroCuenta !== "string" ||
      numeroCuenta.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          error:
            "El número de cuenta es requerido y debe ser una cadena válida.",
        });
    }
    if (!sucursal || typeof sucursal !== "string" || sucursal.trim() === "") {
      return res
        .status(400)
        .json({
          error: "La sucursal es requerida y debe ser una cadena válida.",
        });
    }
    // --- FIN NUEVAS VALIDACIONES ---

    const montoDeposito = parseFloat(cantidad);

    if (isNaN(montoDeposito) || montoDeposito <= 0) {
      return res.status(400).json({
        error: "El monto de depósito debe ser un número válido y mayor a 0.",
      });
    }

    const cuenta = await Cuenta.findOne({ numeroCuenta });
    if (!cuenta) {
      return res.status(404).json({ error: "Cuenta no encontrada." });
    }

    cuenta.saldo += montoDeposito;
    await cuenta.save();

    const transaccion = new Transaccion({
      cuenta: cuenta._id,
      tipo: "deposito",
      cantidad: montoDeposito,
      sucursal,
      fecha: new Date(),
    });

    await transaccion.save();

    res.json({ mensaje: "Depósito exitoso.", saldo: cuenta.saldo });
  } catch (error) {
    console.error("Error en realizarDeposito:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al procesar el depósito." });
  }
};

exports.realizarRetiro = async (req, res) => {
  try {
    const { numeroCuenta, cantidad, sucursal } = req.body;

    // --- NUEVAS VALIDACIONES AQUÍ ---
    if (
      !numeroCuenta ||
      typeof numeroCuenta !== "string" ||
      numeroCuenta.trim() === ""
    ) {
      return res
        .status(400)
        .json({
          error:
            "El número de cuenta es requerido y debe ser una cadena válida.",
        });
    }
    if (!sucursal || typeof sucursal !== "string" || sucursal.trim() === "") {
      return res
        .status(400)
        .json({
          error: "La sucursal es requerida y debe ser una cadena válida.",
        });
    }
    // --- FIN NUEVAS VALIDACIONES ---

    const montoRetiro = parseFloat(cantidad);

    if (isNaN(montoRetiro) || montoRetiro <= 0) {
      return res.status(400).json({
        error: "El monto de retiro debe ser un número válido y mayor a 0.",
      });
    }

    const cuenta = await Cuenta.findOne({ numeroCuenta });
    if (!cuenta) {
      return res.status(404).json({ error: "Cuenta no encontrada." });
    }
    if (cuenta.saldo < montoRetiro) {
      return res.status(400).json({ error: "Saldo insuficiente." });
    }

    cuenta.saldo -= montoRetiro;
    await cuenta.save();

    const transaccion = new Transaccion({
      cuenta: cuenta._id,
      tipo: "retiro",
      cantidad: montoRetiro,
      sucursal,
      fecha: new Date(),
    });

    await transaccion.save();

    res.json({ mensaje: "Retiro exitoso.", saldo: cuenta.saldo });
  } catch (error) {
    console.error("Error en realizarRetiro:", error);
    res
      .status(500)
      .json({ error: "Error interno del servidor al procesar el retiro." });
  }
};
