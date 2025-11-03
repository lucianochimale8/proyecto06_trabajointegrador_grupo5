import React, { useState, useEffect } from 'react';

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
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4">Formulario de Registro</h2>

              {isSubmitted && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  <strong>¡Éxito!</strong> Tus datos han sido guardados correctamente.
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setIsSubmitted(false)}
                  ></button>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="nombre" className="form-label">
                      Nombre *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.nombre ? 'is-invalid' : ''}`}
                      id="nombre"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      placeholder="Ingresa tu nombre"
                    />
                    {errors.nombre && (
                      <div className="invalid-feedback">{errors.nombre}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="apellido" className="form-label">
                      Apellido *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.apellido ? 'is-invalid' : ''}`}
                      id="apellido"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      placeholder="Ingresa tu apellido"
                    />
                    {errors.apellido && (
                      <div className="invalid-feedback">{errors.apellido}</div>
                    )}
                  </div>
                </div>

                <div className="mb-3">
                  <label htmlFor="correo" className="form-label">
                    Correo Electrónico *
                  </label>
                  <input
                    type="email"
                    className={`form-control ${errors.correo ? 'is-invalid' : ''}`}
                    id="correo"
                    name="correo"
                    value={formData.correo}
                    onChange={handleChange}
                    placeholder="ejemplo@correo.com"
                  />
                  {errors.correo && (
                    <div className="invalid-feedback">{errors.correo}</div>
                  )}
                </div>

                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="dni" className="form-label">
                      DNI *
                    </label>
                    <input
                      type="text"
                      className={`form-control ${errors.dni ? 'is-invalid' : ''}`}
                      id="dni"
                      name="dni"
                      value={formData.dni}
                      onChange={handleChange}
                      placeholder="12345678"
                      maxLength="8"
                    />
                    {errors.dni && (
                      <div className="invalid-feedback">{errors.dni}</div>
                    )}
                  </div>

                  <div className="col-md-6 mb-4">
                    <label htmlFor="telefono" className="form-label">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      className={`form-control ${errors.telefono ? 'is-invalid' : ''}`}
                      id="telefono"
                      name="telefono"
                      value={formData.telefono}
                      onChange={handleChange}
                      placeholder="1122334455"
                    />
                    {errors.telefono && (
                      <div className="invalid-feedback">{errors.telefono}</div>
                    )}
                  </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <button
                    type="button"
                    className="btn btn-outline-secondary me-md-2"
                    onClick={handleReset}
                  >
                    Limpiar
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                  >
                    Enviar Datos
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* botón para mostrar lista */}
          <div className="mt-4">
            <button
              className="btn btn-outline-info btn-sm"
              onClick={toggleList}
            >
              {showList ? 'Ocultar datos guardados' : 'Ver datos guardados'}
            </button>

            {showList && (
              <div className="mt-3">
                <h5>Datos guardados</h5>
                {savedData.length === 0 ? (
                  <p className="text-muted">No hay datos guardados</p>
                ) : (
                  <ul className="list-group">
                    {savedData.map((item, idx) => (
                      <li className="list-group-item" key={idx}>
                        <strong>{item.nombre} {item.apellido}</strong>
                        <div>DNI: {item.dni}</div>
                        <div>Teléfono: {item.telefono}</div>
                        <div>Correo: {item.correo}</div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .card {
          border: none;
          border-radius: 15px;
          color: #dd8771ff;
        }

        .form-label {
          font-weight: 500;
          color: #a05050ff;
        }

        .btn-primary {
          background-color: #f8bd85ff;
          border-color: #f1724cff;
        }

        .btn-primary:hover {
          background-color: #d9673aff;
          border-color: #d93a3aff;
        }

        .btn-sm {
          background-color: #fdfdfdff;
          border-color: #f1724cff;
          color: #dd8771ff;
        }

        .btn-sm:hover {
          background-color: #f3e0d9ff;
          border-color: #d93a3aff;
          color: #dd8771ff;
        }
      `}</style>
    </div>
  );
}