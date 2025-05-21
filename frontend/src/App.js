import React from 'react';
import './App.css'; 
import Cuentas from './pages/Cuentas'; 

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Sistema Bancario - Módulo de Cuentas</h1>
      </header>
      <main>
        <Cuentas />
        {}
        {}
      </main>
      <footer style={{ textAlign: 'center', padding: '20px', marginTop: '30px', borderTop: '1px solid #eee' }}>
        <p>© {new Date().getFullYear()} Banco Nexus</p>
      </footer>
    </div>
  );
}

export default App;