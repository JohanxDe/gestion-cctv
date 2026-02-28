import React from "react";
import { useNavigate } from "react-router-dom"; // 1. Importamos el navegador

function Dashboard() {
  const navigate = useNavigate(); // 2. Inicializamos la función navigate

  return (
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#141414', minHeight: '100vh' }}>
      <h1>Panel de Control CCTV</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
        
        {/* CUADRO ESTACIONAMIENTOS: Ahora con onClick */}
        <div 
          onClick={() => navigate('/estacionamientos')} // 3. Al hacer clic, navega a /estacionamientos
          style={{ background: '#333', padding: '20px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer' }}
        >
          <h2>🚗 Estacionamientos</h2>
          <p>5 Cupos disponibles</p>
        </div>

        {/* CUADRO RONDAS (Podemos dejarlo listo para cuando lo creemos) */}
        <div 
          onClick={() => alert("Módulo de Rondas en desarrollo...")}
          style={{ background: '#333', padding: '20px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer' }}
        >
          <h2>🚶 Rondas</h2>
          <p>Iniciar nuevo recorrido</p>
        </div>

        {/* CUADRO AGENDA */}
        <div 
          style={{ background: '#333', padding: '20px', borderRadius: '10px', textAlign: 'center', cursor: 'pointer' }}
        >
          <h2>📅 Agenda</h2>
          <p>2 Visitas para hoy</p>
        </div>

      </div>

      {/* Botón extra para volver al inicio si es necesario */}
      <button 
        onClick={() => navigate('/')}
        style={{ marginTop: '30px', background: 'none', border: '1px solid #555', color: '#888', cursor: 'pointer', padding: '5px 10px' }}
      >
        Cambiar de Usuario
      </button>
    </div>
  );
}

export default Dashboard;