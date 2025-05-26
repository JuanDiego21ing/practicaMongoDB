import React, { useState } from 'react';
import axios from 'axios';

function Transacciones() {
    const [numeroCuenta, setNumeroCuenta] = useState('');
    const [monto, setMonto] = useState('');
    const [tipo, setTipo] = useState('deposito');
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');

    const handleTransaccion = async () => {
        if (!numeroCuenta || !monto || isNaN(monto) || parseFloat(monto) <= 0) { // Añadimos validación para monto <= 0
            setError('Por favor, ingrese un número de cuenta y un monto válido mayor a 0.');
            setMensaje('');
            return;
        }

        setError('');
        setMensaje('');

        try {
            const url = tipo === 'deposito' ? '/api/deposito' : '/api/retiro';
            const response = await axios.post(`http://localhost:5000${url}`, { // << Posible CAMBIO de puerto a 3000
                numeroCuenta,
                cantidad: parseFloat(monto), // << CAMBIO: 'monto' a 'cantidad' para el backend
                sucursal: 'CDMX' // ejemplo fijo, se puede hacer dinámico
            });

            // << CAMBIO: Leer response.data.mensaje
            setMensaje(`✅ ${response.data.mensaje || 'Transacción exitosa'}`);
            setMonto('');
        } catch (err) {
            // << CAMBIO: Leer err.response.data.error
            if (err.response && err.response.data && err.response.data.error) {
                setError(`❌ ${err.response.data.error}`);
            } else {
                setError('❌ Error al realizar la transacción');
            }
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <h2>Realizar Transacción</h2>

            <input
                type="text"
                value={numeroCuenta}
                onChange={(e) => setNumeroCuenta(e.target.value)}
                placeholder="Número de cuenta"
                style={{ marginRight: '10px', padding: '8px' }}
            />

            <input
                type="number"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                placeholder="Monto"
                style={{ marginRight: '10px', padding: '8px' }}
            />

            <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
                style={{ marginRight: '10px', padding: '8px' }}
            >
                <option value="deposito">Depósito</option>
                <option value="retiro">Retiro</option>
            </select>

            <button onClick={handleTransaccion} style={{ padding: '8px 15px' }}>
                Enviar
            </button>

            {mensaje && <p style={{ color: 'green', marginTop: '10px' }}>{mensaje}</p>}
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
}

export default Transacciones;