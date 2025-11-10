import { useState, useEffect } from 'react';

export default function Formulario() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    dni: '',
    telefono: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [savedData, setSavedData] = useState([]);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    const datos = localStorage.getItem('datosUsuarios');
    if (datos) {
      try {
        const parsed = JSON.parse(datos);
        setSavedData(Array.isArray(parsed) ? parsed : [parsed]);
      } catch (err) {
        console.error('Error parseando datosUsuarios:', err);
      }
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const ValidaForm = () => {
    const nuevoError = {};

    if(!formData.nombre.trim()){
      nuevoError.nombre = 'El nombre es obligatorio';
    }else if(formData.nombre.length < 2){
      nuevoError.nombre = 'El nombre debe tener por lo menos dos caracteres';
    }

    if(!formData.apellido.trim()){
      nuevoError.apellido = 'El apellido es obligatorio';
    }else if(formData.apellido.length < 2){
      nuevoError.apellido = 'El apellido debe tener por lo menos dos caracteres';
    }

    if(!formData.correo.trim()){
      nuevoError.correo = 'El correo es obligatorio';
    }else if(!/\S+@\S+\.\S+/.test(formData.correo)){
      nuevoError.correo = 'El formato del correo no es válido';
    }

    if(!formData.dni.trim()){
      nuevoError.dni = 'El DNI es obligatorio';
    }else if(!/^\d{7,8}$/.test(formData.dni.replace(/\D/g, ''))){
      nuevoError.dni = 'El DNI debe tener 7 u 8 dígitos';
    }

    if(!formData.telefono.trim()){
      nuevoError.telefono = 'El teléfono es obligatorio';
    }else if(!/^\d{10,15}$/.test(formData.telefono.replace(/\D/g, ''))){
      nuevoError.telefono = 'El teléfono debe tener entre 10 y 15 dígitos';
    }

    return nuevoError;
  }

  const handleSubmit =(e) =>{
    e.preventDefault();
    const formErrors = ValidaForm();

    if(Object.keys(formErrors).length === 0){
      guardarDatos(formData);
      setIsSubmitted(true);
      setFormData({
        nombre: '',
        apellido: '',
        correo: '',
        dni: '',
        telefono: ''
      });
    } else {
      setErrors(formErrors);
    }
  };

  const guardarDatos = (datos) => {
    const existing = localStorage.getItem('datosUsuarios');
    try {
      if (existing) {
        const parsed = JSON.parse(existing);
        const newArr = Array.isArray(parsed) ? [...parsed, datos] : [parsed, datos];
        localStorage.setItem('datosUsuarios', JSON.stringify(newArr));
        setSavedData(newArr);
      } else {
        localStorage.setItem('datosUsuarios', JSON.stringify([datos]));
        setSavedData([datos]);
      }
    } catch {
      localStorage.setItem('datosUsuarios', JSON.stringify([datos]));
      setSavedData([datos]);
    }
  }

  const handleReset = () => {
    setFormData({
      nombre: '',
      apellido: '',
      correo: '',
      dni: '',
      telefono: ''
    });
    setErrors({});
    setIsSubmitted(false);
  };

  const toggleList = () => {
    setShowList(prev => !prev);
  };

  return (
    <div className="avg-container">
      <h1>Formulario de Registro</h1>

      {isSubmitted && (
        <div className="resultado" style={{
          background: "var(--kawaii-green)",
          borderColor: "var(--kawaii-green)",
          marginBottom: "20px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <strong>¡Éxito!</strong> Tus datos han sido guardados correctamente.
          <button
            type="button"
            onClick={() => setIsSubmitted(false)}
            style={{
              background: "none",
              border: "none",
              fontSize: "1.2rem",
              cursor: "pointer",
              color: "var(--kawaii-brown)",
              padding: "0 10px"
            }}
          >
            ×
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre *"
          style={{
            borderColor: errors.nombre ? "#f44336" : undefined
          }}
        />
        {errors.nombre && (
          <div style={{
            color: "#f44336",
            fontSize: "0.9rem",
            marginTop: "-5px",
            marginBottom: "10px",
            fontFamily: "'KG Candy Cane Stripe', cursive",
            textAlign: "center"
          }}>{errors.nombre}</div>
        )}

        <input
          type="text"
          name="apellido"
          value={formData.apellido}
          onChange={handleChange}
          placeholder="Apellido *"
          style={{
            borderColor: errors.apellido ? "#f44336" : undefined
          }}
        />
        {errors.apellido && (
          <div style={{
            color: "#f44336",
            fontSize: "0.9rem",
            marginTop: "-5px",
            marginBottom: "10px",
            fontFamily: "'KG Candy Cane Stripe', cursive",
            textAlign: "center"
          }}>{errors.apellido}</div>
        )}

        <input
          type="email"
          name="correo"
          value={formData.correo}
          onChange={handleChange}
          placeholder="Correo Electrónico *"
          style={{
            borderColor: errors.correo ? "#f44336" : undefined
          }}
        />
        {errors.correo && (
          <div style={{
            color: "#f44336",
            fontSize: "0.9rem",
            marginTop: "-5px",
            marginBottom: "10px",
            fontFamily: "'KG Candy Cane Stripe', cursive",
            textAlign: "center"
          }}>{errors.correo}</div>
        )}

        <input
          type="text"
          name="dni"
          value={formData.dni}
          onChange={handleChange}
          placeholder="DNI *"
          maxLength="8"
          style={{
            borderColor: errors.dni ? "#f44336" : undefined
          }}
        />
        {errors.dni && (
          <div style={{
            color: "#f44336",
            fontSize: "0.9rem",
            marginTop: "-5px",
            marginBottom: "10px",
            fontFamily: "'KG Candy Cane Stripe', cursive",
            textAlign: "center"
          }}>{errors.dni}</div>
        )}

        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          placeholder="Teléfono *"
          style={{
            borderColor: errors.telefono ? "#f44336" : undefined
          }}
        />
        {errors.telefono && (
          <div style={{
            color: "#f44336",
            fontSize: "0.9rem",
            marginTop: "-5px",
            marginBottom: "10px",
            fontFamily: "'KG Candy Cane Stripe', cursive",
            textAlign: "center"
          }}>{errors.telefono}</div>
        )}

        <div style={{ 
          display: "flex", 
          gap: "10px", 
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "15px"
        }}>
          <button
            type="button"
            className="modern-btn"
            onClick={handleReset}
            style={{
              background: "var(--kawaii-green)",
              color: "var(--kawaii-brown)"
            }}
          >
            Limpiar
          </button>
          <button
            type="submit"
            className="modern-btn"
          >
            Enviar Datos
          </button>
        </div>
      </form>

      {/* botón para mostrar lista */}
      <div style={{ marginTop: "30px" }}>
        <button
          className="modern-btn"
          onClick={toggleList}
          style={{
            background: "var(--kawaii-blue)",
            color: "var(--kawaii-brown)",
            fontSize: "0.9rem",
            padding: "10px 20px"
          }}
        >
          {showList ? 'Ocultar datos guardados' : 'Ver datos guardados'}
        </button>

        {showList && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <h2 style={{
              fontFamily: "'Roundabout', cursive",
              color: "var(--kawaii-brown)",
              marginBottom: "15px",
              textAlign: "center"
            }}>Datos guardados</h2>
            {savedData.length === 0 ? (
              <p style={{
                fontFamily: "'KG Candy Cane Stripe', cursive",
                color: "var(--kawaii-brown)",
                padding: "15px",
                background: "var(--kawaii-yellow)",
                borderRadius: "12px",
                border: "2px solid rgba(139,69,19,0.06)",
                textAlign: "center"
              }}>No hay datos guardados</p>
            ) : (
              <div>
                {savedData.map((item, idx) => (
                  <div key={idx} style={{
                    background: "var(--kawaii-yellow)",
                    borderRadius: "12px",
                    border: "2px solid rgba(139,69,19,0.06)",
                    padding: "15px",
                    marginBottom: "15px",
                    fontFamily: "'KG Candy Cane Stripe', cursive",
                    color: "var(--kawaii-brown)",
                    textAlign: "center"
                  }}>
                    <strong style={{
                      fontFamily: "'Roundabout', cursive",
                      fontSize: "1.1rem",
                      textAlign: "center"
                    }}>{item.nombre} {item.apellido}</strong>
                    <p style={{margin: "5px 0", textAlign: "center"}}>DNI: {item.dni}</p>
                    <p style={{margin: "5px 0", textAlign: "center"}}>Teléfono: {item.telefono}</p>
                    <p style={{margin: "5px 0", textAlign: "center"}}>Correo: {item.correo}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}