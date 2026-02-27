import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
import './App.css'

function App() {
  const [perfiles, setPerfiles] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) return <div className="loading">Cargando sistema operativo...</div>;

  return (
    <div className="netflix-container">
      <h1>¿Quién está de turno hoy?</h1>
      <div className="profile-gate">
        {perfiles.map((perfil) => (
          <div key={perfil.id} className="profile-card" onClick={() => alert(`Entrando como ${perfil.nombre}`)}>
            <div className="avatar-wrapper">
              <img src={perfil.avatar_url || 'https://via.placeholder.com/150'} alt={perfil.nombre} />
            </div>
            <span>{perfil.nombre}</span>
          </div>
        ))}
      </div>
      <button className="manage-button">Administrar Perfiles</button>
    </div>
  );
}

export default App
