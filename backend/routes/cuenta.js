const express = require("express");
const router = express.Router();

const Cuenta = require("../models/Cuenta");
const Transaccion = require("../models/Transaccion"); 
const Cliente = require("../models/Cliente"); 

router.get("/:numeroCuenta", async (req, res) => {
  console.log("Petición GET /api/cuenta/:numeroCuenta recibida con número:", req.params.numeroCuenta);
  try {
    const cuenta = await Cuenta.findOne({ 
      numeroCuenta: req.params.numeroCuenta, 
    }).populate("cliente"); 

    if (!cuenta) {
      return res.status(404).json({ error: "Cuenta no encontrada" });
    }

    console.log("Cuenta encontrada (después de populate):", JSON.stringify(cuenta, null, 2));


    const transacciones = await Transaccion.find({ cuenta: cuenta._id }).sort({
      fecha: -1, 
    });


    let nombreDelCliente = "Cliente no disponible o no encontrado";
    let curpDelCliente = "No disponible";

    if (cuenta.cliente) { 
        nombreDelCliente = `${cuenta.cliente.nombre || ''} ${cuenta.cliente.apellido || ''}`.trim();
        if (!nombreDelCliente) nombreDelCliente = "Cliente sin nombre registrado";
        curpDelCliente = cuenta.cliente.curp || "No disponible";
    } else {
        console.warn("ADVERTENCIA: No se pudo popular el cliente para la cuenta:", cuenta.numeroCuenta, "- ObjectId del cliente:", cuenta.cliente); // cuenta.cliente aquí será el ObjectId original si no se pudo popular
    }

    res.json({
      nombreCliente: nombreDelCliente,       
      curp: curpDelCliente,                  
      numeroCuenta: cuenta.numeroCuenta,
      saldoInicial: cuenta.saldo,           
      transacciones: transacciones,
    });

  } catch (error) {
    console.error("Error en /api/cuenta/:numeroCuenta :", error);
    res.status(500).json({ error: "Error del servidor al procesar la solicitud", detalle: error.message });
  }
});

module.exports = router;