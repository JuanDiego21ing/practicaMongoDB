// simuladores/simulacionConcurrente.js
const axios = require('axios'); // Para consultar el saldo inicial/final
const simularDeposito = require('./operacionSucursalCDMX');
const simularRetiro = require('./operacionSucursalGDL');

const API_BASE_URL = 'http://localhost:5000/api'; // Asegúrate que este puerto sea el correcto de tu backend

async function obtenerSaldoActual(numeroCuenta) {
    try {
        const response = await axios.get(`${API_BASE_URL}/cuenta/${numeroCuenta}`); // Asumiendo que tienes un endpoint GET /api/cuenta/:numeroCuenta
        return response.data.saldo;
    } catch (error) {
        console.error(`Error al obtener saldo de la cuenta ${numeroCuenta}:`, error.response ? error.response.data.error : error.message);
        return null;
    }
}

async function ejecutarSimulacion() {
    const NUMERO_CUENTA = '6696697091'; // <-- ¡Cambia esto por un número de cuenta existente en tu DB!
    const MONTO_DEPOSITO = 100;
    const MONTO_RETIRO = 50;

    console.log('--- Iniciando Simulación Concurrente ---');

    // 1. Obtener saldo inicial
    let saldoInicial = await obtenerSaldoActual(NUMERO_CUENTA);
    if (saldoInicial === null) {
        console.error('No se pudo obtener el saldo inicial. Asegúrate que el número de cuenta es correcto y el endpoint /api/cuenta/:numeroCuenta existe.');
        return;
    }
    console.log(`Saldo inicial de la cuenta ${NUMERO_CUENTA}: $${saldoInicial}`);

    // 2. Ejecutar operaciones concurrentes
    console.log('\nEjecutando operaciones en paralelo...');
    try {
        const resultados = await Promise.all([
            simularDeposito(NUMERO_CUENTA, MONTO_DEPOSITO, 'CDMX'),
            simularRetiro(NUMERO_CUENTA, MONTO_RETIRO, 'GDL')
            // Podrías añadir más operaciones aquí para aumentar la concurrencia
            // simularDeposito(NUMERO_CUENTA, 20, 'MTY'),
            // simularRetiro(NUMERO_CUENTA, 30, 'CUN')
        ]);
        console.log('\nTodas las operaciones concurrentes han finalizado.');
        // console.log('Resultados individuales:', resultados); // Descomenta para ver todos los resultados si es necesario
    } catch (error) {
        console.error('\nUna o más operaciones concurrentes fallaron:', error.message);
    }

    // 3. Obtener saldo final
    let saldoFinal = await obtenerSaldoActual(NUMERO_CUENTA);
    if (saldoFinal === null) {
        console.error('No se pudo obtener el saldo final.');
        return;
    }
    console.log(`\nSaldo final de la cuenta ${NUMERO_CUENTA}: $${saldoFinal}`);

    // 4. Analizar consistencia
    const saldoEsperado = saldoInicial + MONTO_DEPOSITO - MONTO_RETIRO;
    console.log(`Saldo esperado (si las operaciones fueran seriales): $${saldoEsperado}`);

    if (saldoFinal === saldoEsperado) {
        console.log('✅ El saldo es consistente. ¡No se detectaron colisiones o inconsistencias en esta simulación!');
    } else {
        console.error('❌ ¡INCONSISTENCIA DETECTADA! El saldo final no coincide con el saldo esperado.');
        console.error(`Diferencia: $${Math.abs(saldoFinal - saldoEsperado)}`);
        console.error('Esto indica una condición de carrera debido a la concurrencia.');
    }

    console.log('\n--- Simulación Concurrente Finalizada ---');
}

ejecutarSimulacion();