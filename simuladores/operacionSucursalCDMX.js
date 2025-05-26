// simuladores/operacionSucursalCDMX.js
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api'; // Asegúrate que este puerto sea el correcto de tu backend (3000 o 5000)

async function simularDeposito(numeroCuenta, monto, sucursal = 'CDMX') {
    try {
        console.log(`[${sucursal}] Intentando depositar ${monto} a cuenta ${numeroCuenta}...`);
        const response = await axios.post(`${API_BASE_URL}/deposito`, {
            numeroCuenta,
            cantidad: monto, // Recuerda que el backend espera 'cantidad'
            sucursal
        });
        console.log(`[${sucursal}] Depósito exitoso:`, response.data.mensaje, `Nuevo saldo: ${response.data.saldo}`);
        return response.data;
    } catch (error) {
        console.error(`[${sucursal}] Error al depositar:`, error.response ? error.response.data.error : error.message);
        throw error; // Relanzar el error para Promise.all
    }
}

// Exporta la función para poder usarla en el script principal de simulación
module.exports = simularDeposito;

// Ejemplo de cómo se usaría si lo ejecutas directamente (no lo haremos así en la práctica):
// simularDeposito('6696697091', 100, 'CDMX');