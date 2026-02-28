import { useState, useEffect } from 'react'
import {Routes, Route, useNavigate} from 'react-router-dom'
import { supabase } from './supabaseClient'
import Dashboard from './pages/Dashboard'
import Estacionamientos from './pages/Estacionamientos'
import './App.css'

function App() {
  const [perfiles, setPerfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [perfilSeleccionado, setPerfilSeleccionado] = useState(null);
  const [pinIngresado, setPinIngresado] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getPerfiles();
  }, []);

  async function getPerfiles() {
    try {
      const { data, error } = await supabase
        .from('perfiles')
        .select('*');
      
      if (error) throw error;
      setPerfiles(data);
    } catch (error) {
      alert('Error cargando perfiles: ' + error.message);
    } finally {
      setLoading(false);
    }
  }

  const manejarLogin = () =>{
    if(pinIngresado === perfilSeleccionado.pin_acceso){
      alert('Acceso concedido! Bienvenido' + perfilSeleccionado.nombre);
      navigate('/dashboard')
    }else{
      alert('PIN incorrecto. Intenta denuevo.');
      setPinIngresado('')
    }
  }

  if (loading) return <div className="loading">Cargando sistema operativo...</div>;

  return (
<Routes>
      {/* RUTA 1: SELECCIÓN DE PERFIL (LOGIN) */}
      <Route path="/" element={
        <div className="netflix-container">
          {!perfilSeleccionado && (
            <>
              <h1>¿Quién está de turno hoy?</h1>
              <div className="profile-gate">
                {perfiles.map((perfil) => (
                  <div 
                    key={perfil.id} 
                    className="profile-card" 
                    onClick={() => setPerfilSeleccionado(perfil)}
                  >
                    <div className="avatar-wrapper">
                      <img src={perfil.avatar_url || 'https://via.placeholder.com/150'} alt={perfil.nombre} />
                    </div>
                    <span>{perfil.nombre}</span>
                  </div>
                ))}
              </div>
              <button className="manage-button">Administrar Perfiles</button>
            </>
          )}

          {perfilSeleccionado && (
            <div className="pin-screen">
              <button className="back-btn" onClick={() => {setPerfilSeleccionado(null); setPinIngresado('');}}>
                ← Volver
              </button>
              <h2>Ingresa el PIN para {perfilSeleccionado.nombre}</h2>
              <input 
                type="password" 
                maxLength="4" 
                className="pin-input"
                value={pinIngresado} 
                onChange={(e) => setPinIngresado(e.target.value)} 
                autoFocus 
              />
              <button className="enter-btn" onClick={manejarLogin}>Entrar</button>
            </div>
          )}
        </div>
      } />

      {/* RUTA 2: DASHBOARD */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* RUTA 3: ESTACIONAMIENTOS */}
      <Route path="/estacionamientos" element={<Estacionamientos />} />
    </Routes>
  );
}

export default App
