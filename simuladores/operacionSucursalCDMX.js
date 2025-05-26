// simuladores/operacionSucursalCDMX.js
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api'; 

async function simularDeposito(numeroCuenta, monto, sucursal = 'CDMX') {
    try {
        console.log(`[${sucursal}] Intentando depositar ${monto} a cuenta ${numeroCuenta}...`);
        const response = await axios.post(`${API_BASE_URL}/deposito`, {
            numeroCuenta,
            cantidad: monto, 
            sucursal
        });
        console.log(`[${sucursal}] Depósito exitoso:`, response.data.mensaje, `Nuevo saldo: ${response.data.saldo}`);
        return response.data;
    } catch (error) {
        console.error(`[${sucursal}] Error al depositar:`, error.response ? error.response.data.error : error.message);
        throw error; 
    }
}


module.exports = simularDeposito;

