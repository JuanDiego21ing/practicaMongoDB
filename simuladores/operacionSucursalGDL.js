// simuladores/operacionSucursalGDL.js
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api'; // Asegúrate que este puerto sea el correcto de tu backend

async function simularRetiro(numeroCuenta, monto, sucursal = 'GDL') {
    try {
        console.log(`[${sucursal}] Intentando retirar ${monto} de cuenta ${numeroCuenta}...`);
        const response = await axios.post(`${API_BASE_URL}/retiro`, {
            numeroCuenta,
            cantidad: monto,
            sucursal
        });
        console.log(`[${sucursal}] Retiro exitoso:`, response.data.mensaje, `Nuevo saldo: ${response.data.saldo}`);
        return response.data;
    } catch (error) {
        console.error(`[${sucursal}] Error al retirar:`, error.response ? error.response.data.error : error.message);
        throw error; // Relanzar el error para Promise.all
    }
}

// Exporta la función para poder usarla en el script principal de simulación
module.exports = simularRetiro;

// Ejemplo de cómo se usaría si lo ejecutas directamente:
// simularRetiro('6696697091', 50, 'GDL');