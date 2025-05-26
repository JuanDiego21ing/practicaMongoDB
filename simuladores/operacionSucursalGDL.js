// simuladores/operacionSucursalGDL.js
const axios = require('axios');

const API_BASE_URL = 'http://localhost:5000/api'; 

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
        throw error; 
    }
}


module.exports = simularRetiro;

