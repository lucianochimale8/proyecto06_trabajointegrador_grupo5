import { useState } from 'react';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [mensaje, setMensaje] = useState('');

  const usuarios = [
    { nombre: 'Ezquizos', clave: 'escabio5' },
    { nombre: 'Admin', clave: '1234' }
];

const manejarEnvio = e => {
    e.preventDefault();
    
    const valido = !usuarios.every(
      u => u.nombre !== usuario || u.clave !== contraseña
    );

    if (valido) {
      setMensaje(`Bienvenido, ${usuario}`);
    } else {
      setMensaje('Usuario o contraseña incorrectos');
    }
  };

  return (
    <div className="login-contenedor">
      <form className="login-formulario" onSubmit={manejarEnvio}>
        <h2>Iniciar sesión</h2>

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onChange={e => setUsuario(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={contraseña}
          onChange={e => setContraseña(e.target.value)}
          required
        />

        <button type="submit">Entrar</button>
        {mensaje && <p>{mensaje}</p>}
      </form>
    </div>
  );
}