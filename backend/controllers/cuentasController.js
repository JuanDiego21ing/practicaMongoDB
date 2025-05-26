const Cuenta = require('../models/Cuenta'); // Asegúrate de que la ruta a tu modelo 'Cuenta' sea correcta

exports.obtenerCuentaPorNumero = async (req, res) => {
    try {
        const { numeroCuenta } = req.params; // Captura el número de cuenta de la URL
        console.log(`Petición GET /api/cuenta/:numeroCuenta recibida con número: ${numeroCuenta}`);

        // Busca la cuenta por su número
        const cuenta = await Cuenta.findOne({ numeroCuenta }); // No necesitas populate si no mostrarás el cliente en esta respuesta

        if (!cuenta) {
            console.warn(`Cuenta no encontrada para número: ${numeroCuenta}`);
            return res.status(404).json({ error: 'Cuenta no encontrada.' });
        }

        console.log('Cuenta encontrada para GET:', cuenta);

        // Envía solo los datos relevantes que tu simulador necesita
        res.status(200).json({
            numeroCuenta: cuenta.numeroCuenta,
            saldo: cuenta.saldo, // ¡Aquí devolvemos el saldo!
            tipo: cuenta.tipo,
            // Puedes añadir otros campos si los necesitas en el frontend o simulador
            // fechaCreacion: cuenta.fechaCreacion
        });

    } catch (error) {
        console.error('Error al obtener cuenta por número:', error);
        res.status(500).json({ error: 'Error interno del servidor al obtener la cuenta.' });
    }
};