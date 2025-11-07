import { useState, useEffect } from 'react';
import '../../../styles/colores.css';

const Colores = () => {
  const colores = [
    { nombre: 'red', espanol: 'rojo', codigo: '#FF6B6B' },
    { nombre: 'yellow', espanol: 'amarillo', codigo: '#FFD93D' },
    { nombre: 'blue', espanol: 'azul', codigo: '#6BCEFF' },
    { nombre: 'orange', espanol: 'naranja', codigo: '#FFB347' },
    { nombre: 'purple', espanol: 'morado', codigo: '#C780E8' },
    { nombre: 'green', espanol: 'verde', codigo: '#7BCF7B' }
  ];

  const [colorActual, setColorActual] = useState(null);
  const [opciones, setOpciones] = useState([]);
  const [puntaje, setPuntaje] = useState(0);
  const [mensaje, setMensaje] = useState('');
  const [modoJuego, setModoJuego] = useState('textoAColor');

  const generarJuego = () => {
  // selcciona el color de manera aleatoria por indice
  const indiceAleatorio = Math.floor(Math.random() * colores.length);
  const colorObjetivo = colores[indiceAleatorio];
  setColorActual(colorObjetivo);

  // genera las opciones
  const tresOpciones = colores.reduce((acumulador, color) => {
    if (acumulador.length < 3) {
      acumulador.push(color);
    }
    return acumulador;
  }, []);

  // mezcla las opciones
  const opcionesMezcladas = tresOpciones.reduce((acumulador, color) => {
    const posAleatoria = Math.floor(Math.random() * (acumulador.length + 1));
    acumulador.splice(posAleatoria, 0, color);
    return acumulador;
  }, []);

  // verifica que esté la opcion corrrecta
  const objetivoPresente = opcionesMezcladas.find(opcion => 
    opcion.nombre === colorObjetivo.nombre
  );

  if (!objetivoPresente) {
    opcionesMezcladas[0] = colorObjetivo;
  }

  setOpciones(opcionesMezcladas);
  setMensaje('');
};

  useEffect(() => {
    generarJuego();
  }, []);

  const manejarRespuesta = (colorSeleccionado) => {
    if (modoJuego === 'textoAColor') {
      // texto arriba, botones de colores abajo
      if (colorSeleccionado.nombre === colorActual.nombre) {
        setPuntaje(puntaje + 1);
        setMensaje('¡Correcto!');
      } else {
        setMensaje(`¡Oops! Era ${colorActual.espanol}`);
      }
    } else {
      // color arriba, botones de texto abajo
      if (colorSeleccionado.nombre === colorActual.nombre) {
        setPuntaje(puntaje + 1);
        setMensaje('¡Correcto!');
      } else {
        setMensaje(`¡Oops! Era ${colorActual.nombre}`);
      }
    }
    
    setTimeout(() => {
      generarJuego();
    }, 1500);
  };

  const cambiarModoJuego = () => {
    setModoJuego(modoJuego === 'textoAColor' ? 'colorATexto' : 'textoAColor');
    setTimeout(() => {
      generarJuego();
    }, 300);
  };

  return (
    <div className="juego-colores">
      <div className="encabezado-juego">
        <h1 className="titulo-juego">Ejercicio de Colores</h1>
        <div className="puntaje">Puntos: {puntaje}</div>
      </div>

      <div className="instrucciones">
        <p>
          {modoJuego === 'textoAColor' 
            ? 'Presiona el botón del color que coincide con la palabra'
            : 'Presiona la palabra que coincide con el color del círculo'}
        </p>
      </div>

      <div className="contenedor-juego">
        <div className="area-pregunta">
          {modoJuego === 'textoAColor' ? (
            <div className="palabra-color" style={{ color: colorActual?.codigo }}>
              {colorActual?.nombre}
            </div>
          ) : (
            <div 
              className="circulo-color" 
              style={{ backgroundColor: colorActual?.codigo }}
            ></div>
          )}
        </div>

        <div className="area-opciones">
          {opciones.map((color, indice) => (
            <button
              key={indice}
              className="boton-opcion"
              onClick={() => manejarRespuesta(color)}
            >
              {modoJuego === 'textoAColor' ? (
                <div 
                  className="opcion-color" 
                  style={{ backgroundColor: color.codigo }}
                  title={color.espanol}
                ></div>
              ) : (
                <span className="opcion-texto">{color.nombre}</span>
              )}
            </button>
          ))}
        </div>

        {mensaje && (
          <div className="mensaje">
            {mensaje}
          </div>
        )}

        <button className="boton-cambiar-modo" onClick={cambiarModoJuego}>
          Cambiar Modo de Juego
        </button>
      </div>
    </div>
  );
};

export default Colores;