import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { useNavigate } from 'react-router-dom';

function Estacionamientos() {
  const [slots, setSlots] = useState([]);
  const [ahora, setAhora] = useState(new Date());
  const navigate = useNavigate();

  // 1. Cargar datos de Supabase
  const fetchEstacionamientos = async () => {
    const { data } = await supabase
      .from('estacionamientos')
      .select('*')
      .order('numero_slot', { ascending: true });
    setSlots(data || []);
  };

  useEffect(() => {
    fetchEstacionamientos();
    // Actualizar el reloj interno cada segundo para los contadores
    const timer = setInterval(() => setAhora(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // 2. Función para calcular tiempo restante (30 min)
  const calcularRestante = (horaEntrada) => {
    const entrada = new Date(horaEntrada);
    const limite = new Date(entrada.getTime() + 30 * 60000); // +30 minutos
    const dif = limite - ahora;

    if (dif <= 0) return "¡TIEMPO AGOTADO!";
    
    const min = Math.floor((dif / 1000 / 60) % 60);
    const seg = Math.floor((dif / 1000) % 60);
    return `${min}:${seg < 10 ? '0' : ''}${seg}`;
  };

  // 3. Acciones: Ocupar y Liberar
  const manejarEstado = async (id, estaOcupado) => {
    const { error } = await supabase
      .from('estacionamientos')
      .update({ 
        estado: !estaOcupado, 
        hora_entrada: !estaOcupado ? new Date().toISOString() : null 
      })
      .eq('id', id);
    
    if (!error) fetchEstacionamientos();
  };

  return (
    <div style={{ padding: '20px', color: 'white', backgroundColor: '#141414', minHeight: '100vh' }}>
      <button onClick={() => navigate('/dashboard')} style={{ marginBottom: '20px' }}>← Volver</button>
      <h1>Control de Estacionamientos</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
        {slots.map(slot => {
          const tiempoAgotado = slot.estado && slot.tiene_contador && (new Date(new Date(slot.hora_entrada).getTime() + 30 * 60000) - ahora <= 0);

          return (
            <div key={slot.id} style={{
              padding: '20px',
              borderRadius: '12px',
              backgroundColor: slot.estado ? (tiempoAgotado ? '#e74c3c' : '#2c3e50') : '#27ae60',
              border: tiempoAgotado ? '2px solid white' : 'none',
              textAlign: 'center',
              boxShadow: '0 4px 6px rgba(0,0,0,0.3)'
            }}>
              <h2 style={{ margin: 0 }}>N° {slot.numero_slot}</h2>
              <p style={{ fontSize: '0.8rem', opacity: 0.8 }}>
                {slot.tiene_contador ? '⏱️ VISITA (30 min)' : '📌 FIJO'}
              </p>

              {slot.estado ? (
                <div style={{ margin: '15px 0' }}>
                  <p>Estado: 🔴 Ocupado</p>
                  {slot.tiene_contador && (
                    <h3 style={{ color: tiempoAgotado ? '#fff' : '#f1c40f' }}>
                      {calcularRestante(slot.hora_entrada)}
                    </h3>
                  )}
                  <button onClick={() => manejarEstado(slot.id, true)}>Liberar Cupo</button>
                </div>
              ) : (
                <div style={{ margin: '15px 0' }}>
                  <p>Estado: 🟢 Disponible</p>
                  <button onClick={() => manejarEstado(slot.id, false)}>Registrar Ingreso</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
      
      <button style={{ marginTop: '30px', padding: '10px', background: '#444', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
              onClick={() => alert("Función para añadir nuevo estacionamiento")}>
        + Configurar Nuevo Estacionamiento
      </button>
    </div>
  );
}

export default Estacionamientos;