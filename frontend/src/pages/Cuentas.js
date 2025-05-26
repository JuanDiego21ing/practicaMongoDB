import React, { useState } from 'react';
import axios from 'axios'; 

function Cuentas() {
    const [numeroCuenta, setNumeroCuenta] = useState('');
    const [datosCuenta, setDatosCuenta] = useState(null); 
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (event) => {
        setNumeroCuenta(event.target.value);
    };

    const handleConsulta = async () => {
        if (!numeroCuenta.trim()) {
            setError('Por favor, ingrese un número de cuenta.');
            setDatosCuenta(null);
            return;
        }

        setLoading(true);
        setError('');
        setDatosCuenta(null); 

        try {
            
            const response = await axios.get(`http://localhost:5000/api/cuenta/${numeroCuenta}`);
            
        
            setDatosCuenta(response.data);

        } catch (err) {
            console.error("Error al consultar la cuenta:", err);
            if (err.response) {
                setError(`Error: ${err.response.data.message || err.response.statusText || 'No se pudo obtener la información.'}`);
            } else if (err.request) {
                setError('Error de red: No se pudo conectar al servidor. ¿Está el backend corriendo?');
            } else {
                setError('Ocurrió un error al procesar la solicitud.');
            }
            setDatosCuenta(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2>Consulta de Saldo y Movimientos de Cuenta</h2>
            
            <div>
                <input
                    type="text"
                    value={numeroCuenta}
                    onChange={handleInputChange}
                    placeholder="Ingrese número de cuenta"
                    style={{ padding: '8px', marginRight: '10px', fontSize: '16px' }}
                />
                <button 
                    onClick={handleConsulta} 
                    disabled={loading}
                    style={{ padding: '8px 15px', fontSize: '16px', cursor: 'pointer' }}
                >
                    {loading ? 'Consultando...' : 'Consultar'}
                </button>
            </div>

            {error && <p style={{ color: 'red', marginTop: '15px' }}>{error}</p>}

            {datosCuenta && (
                <div style={{ marginTop: '20px', border: '1px solid #ccc', padding: '15px' }}>
                    <h3>Información de la Cuenta</h3>
                    <p><strong>Número de Cuenta:</strong> {numeroCuenta}</p>
                    <p><strong>Nombre del Cliente:</strong> {datosCuenta.nombreCliente || 'No disponible'}</p>
                    <p><strong>Saldo Inicial:</strong> ${typeof datosCuenta.saldo === 'number' ? datosCuenta.saldo.toFixed(2) : datosCuenta.saldo || 'No disponible'}</p>
                    
                    {}
                    {datosCuenta.movimientos && datosCuenta.movimientos.length > 0 && (
                        <div>
                            <h4>Movimientos:</h4>
                            <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
                                {datosCuenta.movimientos.map((mov, index) => (
                                    <li key={index} style={{ borderBottom: '1px solid #eee', padding: '5px 0' }}>
                                        {}
                                        Tipo: {mov.tipo}, Monto: ${mov.monto}, Fecha: {new Date(mov.fecha).toLocaleDateString()}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                     {datosCuenta.movimientos && datosCuenta.movimientos.length === 0 && (
                        <p>No hay movimientos registrados para esta cuenta.</p>
                    )}
                </div>
            )}
        </div>
    );
}

export default Cuentas;