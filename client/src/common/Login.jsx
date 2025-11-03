import React, { useState } from 'react';
import { authenticate } from '../utils/auth';
import '../styles/Login.css';

export default function Login() {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState(null);
const [loading, setLoading] = useState(false);

const handleSubmit = async (e) => {
e.preventDefault();
setMessage(null);
setLoading(true);

const result = await authenticate(username, password);
setLoading(false);

if (result.success) {
setMessage({ type: 'success', text: `Login exitoso. ¡Bienvenido ${username}!` });

} else {
setMessage({ type: 'error', text: result.message });
}
};

return (
<div className="login-wrap">
<form className="login-card" onSubmit={handleSubmit}>
<h2 className="login-title">Iniciar sesión</h2>

<label className="label">Usuario</label>
<input
className="input"
value={username}
onChange={(e) => setUsername(e.target.value)}
placeholder="Nombre de usuario"
autoComplete="username"
required
/>

<label className="label">Contraseña</label>
<input
className="input"
value={password}
onChange={(e) => setPassword(e.target.value)}
type="password"
placeholder="Contraseña"
autoComplete="current-password"
required
/>

<button className="btn" type="submit" disabled={loading}>
{loading ? 'Verificando...' : 'Entrar'}
</button>

{message && (
<div className={"msg " + (message.type === 'success' ? 'msg-success' : 'msg-error')}>
{message.text}
</div>
)}

</form>
</div>
);
}