// D:\banco-nexus\backend\controllers\transaccionesController.js

const Cuenta = require('../models/Cuenta');
const Transaccion = require('../models/Transaccion');

exports.realizarDeposito = async (req, res) => {
    try {
        const { numeroCuenta, cantidad, sucursal } = req.body;

        // --- CAMBIO CLAVE AQUÍ: Convertir cantidad a número ---
        const montoDeposito = parseFloat(cantidad);

        if (isNaN(montoDeposito) || montoDeposito <= 0) {
            return res.status(400).json({ error: 'El monto de depósito debe ser un número válido y mayor a 0.' });
        }

        const cuenta = await Cuenta.findOne({ numeroCuenta });
        if (!cuenta) {
            return res.status(404).json({ error: 'Cuenta no encontrada.' });
        }

        // Usar el monto convertido
        cuenta.saldo += montoDeposito;
        await cuenta.save();

        const transaccion = new Transaccion({
            cuenta: cuenta._id,
            tipo: 'deposito',
            // Usar el monto convertido para la transacción también
            cantidad: montoDeposito,
            sucursal,
            fecha: new Date(), // Agrega la fecha para coherencia con el Integrante 1
            // Puedes agregar saldoAnterior y saldoActual si quieres un registro más detallado en la transacción
            // saldoAnterior: cuenta.saldo - montoDeposito,
            // saldoActual: cuenta.saldo
        });

        await transaccion.save();

        res.json({ mensaje: 'Depósito exitoso.', saldo: cuenta.saldo });
    } catch (error) {
        console.error('Error en realizarDeposito:', error); // Mensaje más descriptivo
        res.status(500).json({ error: 'Error interno del servidor al procesar el depósito.' });
    }
};

exports.realizarRetiro = async (req, res) => {
    try {
        const { numeroCuenta, cantidad, sucursal } = req.body;

        // --- CAMBIO CLAVE AQUÍ: Convertir cantidad a número ---
        const montoRetiro = parseFloat(cantidad);

        if (isNaN(montoRetiro) || montoRetiro <= 0) {
            return res.status(400).json({ error: 'El monto de retiro debe ser un número válido y mayor a 0.' });
        }

        const cuenta = await Cuenta.findOne({ numeroCuenta });
        if (!cuenta) {
            return res.status(404).json({ error: 'Cuenta no encontrada.' });
        }

        // Usar el monto convertido
        if (cuenta.saldo < montoRetiro) {
            return res.status(400).json({ error: 'Saldo insuficiente.' });
        }

        cuenta.saldo -= montoRetiro;
        await cuenta.save();

        const transaccion = new Transaccion({
            cuenta: cuenta._id,
            tipo: 'retiro',
            // Usar el monto convertido para la transacción también
            cantidad: montoRetiro,
            sucursal,
            fecha: new Date(), // Agrega la fecha
            // saldoAnterior: cuenta.saldo + montoRetiro,
            // saldoActual: cuenta.saldo
        });

        await transaccion.save();

        res.json({ mensaje: 'Retiro exitoso.', saldo: cuenta.saldo });
    } catch (error) {
        console.error('Error en realizarRetiro:', error); // Mensaje más descriptivo
        res.status(500).json({ error: 'Error interno del servidor al procesar el retiro.' });
    }
};