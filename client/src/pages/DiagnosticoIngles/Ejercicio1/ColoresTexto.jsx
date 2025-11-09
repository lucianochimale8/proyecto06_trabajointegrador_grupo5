import { useState, useEffect, useRef } from 'react';
import '../../../styles/colores.css';
// importar sonidos para el juego
import sonidoCorrecto from "../../../assets/audio/correct.mp3";
import sonidoError from "../../../assets/audio/gameover.mp3";
import sonidoNextLevel from "../../../assets/audio/next-level-m.mp3";
import sonidoGanar from "../../../assets/audio/win.mp3";
// import Confetti from '../../../common/Confetti.jsx';

const Colores = () => {
    // Definicion de datos y estados
    // Array de colores disponibles para el juego
    // Cada color tiene: nombre en inglés, nombre en español y código hexadecimal
  const colores = [
    { nombre: 'red', espanol: 'rojo', codigo: '#FF6B6B' },
    { nombre: 'yellow', espanol: 'amarillo', codigo: '#FFD93D' },
    { nombre: 'blue', espanol: 'azul', codigo: '#6BCEFF' },
    { nombre: 'orange', espanol: 'naranja', codigo: '#FFB347' },
    { nombre: 'purple', espanol: 'morado', codigo: '#C780E8' },
    { nombre: 'green', espanol: 'verde', codigo: '#7BCF7B' }
  ];
  // referencias para el sonido
  const sonidoCorrectoRef = useRef(null);
  const sonidoErrorRef = useRef(null);
  const sonidoNextLevelRef = useRef(null);
  const sonidoGanarRef = useRef(null);
  // inicializar los sonidos
  useEffect(() => {
    sonidoCorrectoRef.current = new Audio(sonidoCorrecto);
    sonidoCorrectoRef.current.volume = 0.5;
    sonidoCorrectoRef.current.preload = 'auto';
    
    sonidoErrorRef.current = new Audio(sonidoError);
    sonidoErrorRef.current.volume = 0.5;
    sonidoErrorRef.current.preload = 'auto';
    
    sonidoNextLevelRef.current = new Audio(sonidoNextLevel);
    sonidoNextLevelRef.current.volume = 0.6;
    sonidoNextLevelRef.current.preload = 'auto';
    
    sonidoGanarRef.current = new Audio(sonidoGanar);
    sonidoGanarRef.current.volume = 0.6;
    sonidoGanarRef.current.preload = 'auto';
  }, []);

  // funcion para reproducir sonidos
  const reproducirSonido = (sonidoRef) => {
    if (sonidoRef && sonidoRef.current) {
      try {
        // Resetear al inicio sin pausar (pausar puede causar problemas)
        if (sonidoRef.current.currentTime > 0) {
          sonidoRef.current.currentTime = 0;
        }
        // Reproducir directamente
        const playPromise = sonidoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch(error => {
            // Si falla, intentar recargar y reproducir
            if (error.name !== 'NotAllowedError' && error.name !== 'NotSupportedError') {
              try {
                sonidoRef.current.load();
                sonidoRef.current.currentTime = 0;
                sonidoRef.current.play().catch(() => {
                  // Ignorar errores silenciosamente
                });
              } catch (e) {
                // Ignorar errores silenciosamente
              }
            }
          });
        }
      } catch (error) {
        // Ignorar errores silenciosamente
      }
    }
  };
  //Estados del componente
  //color que se debe adivinar en ronda actual
  const [colorActual, setColorActual] = useState(null);
  //array para opciones de respuesta por ronda (seran 3 colores)
  const [opciones, setOpciones] = useState([]);
  // Puntaje separado para cada tipo de juego
  const [puntajeTextoAColor, setPuntajeTextoAColor] = useState(0); // juego 1: ver palabra elegir color
  const [puntajeColorATexto, setPuntajeColorATexto] = useState(0); // juego 2: ver color y elegir palabra
  // mensaje de acierto o error
  const [mensaje, setMensaje] = useState('');
  // modo de juego actual 'textoAColor' o 'colorATexto'
  const [modoJuego, setModoJuego] = useState('textoAColor');
  // intentos restantes (6 por juego)
  const [intentosRestantes, setIntentosRestantes] = useState(6);
  // controlar si el juego esta activo o terminado
  const [juegoActivo, setJuegoActivo] = useState(true);
  // almacenar los resultados finales al terminar ambos juegos
  const [resultados, setResultados] = useState(null);
  // rastrear qué botón fue seleccionado y si fue correcto
  const [botonSeleccionado, setBotonSeleccionado] = useState(null);
  const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);

  // funcion para generar una ronda nueva del juego:
  // seleccionar un color objetivo aleatorio
  // genera 3 opciones de respuesta incluyendo la correcta
  // mezcla las opciones para que la posicion correcta sea aleatoria
  const generarJuego = () => {
    // verificar si el juego no esta activo para no generar una nueva ronda
    if (!juegoActivo) return;
    // seleccionar color objetivo aleatorio, evitando repetir el color anterior
    let colorObjetivo;
    let intentos = 0;
    const maxIntentos = 20;
    
    do {
      // generar indice aleatorio
      const indiceAleatorio = Math.floor(Math.random() * colores.length);
      // crear un color objetivo en base a ese indice dentro de colores
      colorObjetivo = colores[indiceAleatorio];
      intentos++;
      
      // Si no hay color anterior o el color es diferente al anterior, usarlo
      if (!colorActual || colorObjetivo.nombre !== colorActual.nombre) {
        break;
      }
      
      // Si después de varios intentos aún es el mismo, forzar un cambio
      if (intentos >= maxIntentos) {
        // Filtrar colores diferentes al anterior
        const coloresDiferentes = colores.filter(c => 
          !colorActual || c.nombre !== colorActual.nombre
        );
        if (coloresDiferentes.length > 0) {
          const indiceAleatorio = Math.floor(Math.random() * coloresDiferentes.length);
          colorObjetivo = coloresDiferentes[indiceAleatorio];
        }
        break;
      }
    } while (intentos < maxIntentos);
    
    // seleccionar color como objetivo
    setColorActual(colorObjetivo);
    // Crear opciones únicas excluyendo el color objetivo
    const opcionesDisponibles = [...colores].filter(color => 
      color.nombre !== colorObjetivo.nombre
    );
    // Mezclar opciones disponibles y tomar 2
    const opcionesMezcladas = [...opcionesDisponibles]
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    // para tener los colores que se mostraran en la ronda
    // Agregar la opción correcta a las opciones
    opcionesMezcladas.push(colorObjetivo);
    // mezclar todas las opciones para que la posicion correcta sea aletoria
    opcionesMezcladas.sort(() => Math.random() - 0.5);
    // actualizar estado con las nuevas opciones
    setOpciones(opcionesMezcladas);
    setMensaje(''); // Limpiar mensaje anterior
    setBotonSeleccionado(null); // Resetear botón seleccionado
    setRespuestaCorrecta(null); // Resetear respuesta correcta
  };
  // para iniciar el juego
  // use effect que se ejecuta cuando el juego se activa
  // genera la primera ronda al iniciar el componente
  useEffect(() => {
    if (juegoActivo && modoJuego === 'textoAColor' && opciones.length === 0) {
      generarJuego();
    }
  }, [juegoActivo, modoJuego]);

  // useEffect para generar juego cuando cambia al segundo nivel
  useEffect(() => {
    if (modoJuego === 'colorATexto' && juegoActivo && intentosRestantes === 6 && opciones.length === 0) {
      // Esperar un momento después del cambio de modo para generar el juego
      const timer = setTimeout(() => {
        setMensaje('');
        generarJuego();
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [modoJuego, juegoActivo, intentosRestantes]);

  // manejo de respuesta del usuario
  // procesar la respuesta del usuario cuando selecciona una opcion
  const manejarRespuesta = (colorSeleccionado, indice) => {
    // si el juego no esta activo ignorar clicks
    if (!juegoActivo) return;
    // si ya se seleccionó un botón, no hacer nada
    if (botonSeleccionado !== null) return;
    // verificar si la respuesta es correcta
    let esCorrecto = colorSeleccionado.nombre === colorActual.nombre;
    // calcular intentos restantes despues de esta respuesta
    let nuevoIntentos = intentosRestantes - 1;
    // Marcar el botón seleccionado
    setBotonSeleccionado(indice);
    setRespuestaCorrecta(esCorrecto);
    // reproducir sonido según si acerto o fallo
    if (esCorrecto) {
      reproducirSonido(sonidoCorrectoRef);
    } else {
      reproducirSonido(sonidoErrorRef);
    }
    // Actualizar puntaje según el modo y si acerto
    if (esCorrecto) {
      if (modoJuego === 'textoAColor') {
        setPuntajeTextoAColor(puntajeTextoAColor + 1);
      } else {
        setPuntajeColorATexto(puntajeColorATexto + 1);
      }
      setMensaje('¡Correcto!');
    } else {
        // mensaje de error con la respuesta correcta
      setMensaje(
        modoJuego === 'textoAColor' 
          ? `¡Oops! Era ${colorActual.espanol}` // mostrar en español para texto->color
          : `¡Oops! Era ${colorActual.nombre}` // mostrar en ingles para color->texto
      );
    }
    // Actualizar intentos restantes
    setIntentosRestantes(nuevoIntentos);
    // transiciones entre juegos
    // Verificar si se completaron los 6 intentos
    if (nuevoIntentos === 0) {
      if (modoJuego === 'textoAColor') {
        // Cambiar al segundo juego
        setTimeout(() => {
            reproducirSonido(sonidoNextLevelRef);
            setMensaje('¡Segundo juego! Adivina el nombre del color');
            setBotonSeleccionado(null);
            setRespuestaCorrecta(null);
            setIntentosRestantes(6); // reiniciar intentos
            // Limpiar opciones y color actual
            setOpciones([]);
            setColorActual(null);
            // Cambiar el modo y luego generar el juego
            setModoJuego('colorATexto');
        }, 2000); // 2 seg antes de cambiar
      } else {
        // Terminar ambos juegos
        setTimeout(() => {
          finalizarJuegos();
        }, 2000);
      }
    } else {
      // Continuar con siguiente ronda
      setTimeout(() => {
        generarJuego();
      }, 1500);
    }
  };
  // finalizacion y reinicio del juego
  // finalizar y calcular los resultados finales
  const finalizarJuegos = () => {
    setJuegoActivo(false);
    // calcular y almacenar resultados finales
    setResultados({
      textoAColor: puntajeTextoAColor, // del primero
      colorATexto: puntajeColorATexto, // del segundo
      total: puntajeTextoAColor + puntajeColorATexto, // el total
      maximo: 12 // los intentos maximos posibles
    });
    // Reproducir sonido de victoria cuando se muestra la pantalla de resultados
    reproducirSonido(sonidoGanarRef);
  };
  // reiniciar a estado inicial
  const reiniciarJuego = () => {
    // restablecer estados a valores iniciales
    setPuntajeTextoAColor(0);
    setPuntajeColorATexto(0);
    setIntentosRestantes(6);
    setModoJuego('textoAColor');
    setJuegoActivo(true);
    setResultados(null);
    setMensaje('');
    setBotonSeleccionado(null);
    setRespuestaCorrecta(null);
  };
  // cambio manual de modo de juego por parte del usuario
  const cambiarModoJuego = () => {
    if (!juegoActivo) return;
    // alternar entre los dos juegos
    setModoJuego(modoJuego === 'textoAColor' ? 'colorATexto' : 'textoAColor');
    // generar ronda despues del cambio
    setTimeout(() => {
      generarJuego();
    }, 300);
  };
  // Pantalla de resultados finales
  if (resultados) {
    return (
      <div className="juego-colores">
        <div className="encabezado-juego">
          <h1 className="titulo-juego">Resultados Finales</h1>
        </div>
        {/* resultados del primer juego */}
        <div className="contenedor-resultados">
          <div className="resultado-juego">
            <h3>Texto a Color</h3>
            <p>{resultados.textoAColor}/6 correctos</p>
          </div>
          {/* resultados del segundo juego */}
          <div className="resultado-juego">
            <h3>Color a Texto</h3>
            <p>{resultados.colorATexto}/6 correctos</p>
          </div>
          {/* resultados totales de ambos juegos */}
          <div className="resultado-total">
            <h2>Puntuación Total</h2>
            <p>{resultados.total}/12 puntos</p>
            <p className="porcentaje">
              {Math.round((resultados.total / resultados.maximo) * 100)}% de aciertos
            </p>
          </div>
          {/* boton de reinicio */}
          <button className="boton-reiniciar" onClick={reiniciarJuego}>
            Jugar Nuevamente
          </button>
        </div>
        {/* <Confetti colors={['#E14D43', '#D6D8A0', 'beige', '#8B4513']} /> */}
      </div>
    );
  }

  return (
    <div className="juego-colores">
      <div className="encabezado-juego">
        <h1 className="titulo-juego">Ejercicio de Colores</h1>
        <div className="contadores">
            {/* mostrar puntaje del juego actual */}
          <div className="puntaje" style={{ marginTop: '15px' }}>
            Puntos: {modoJuego === 'textoAColor' ? puntajeTextoAColor : puntajeColorATexto}/6
          </div>
          {/* mostrar intentos restantes */}

        </div>
      </div>
        {/* intrucciones del juego */}
      <div className="instrucciones">
        <p>
          {modoJuego === 'textoAColor' 
            ? 'Presiona el botón del color que coincide con la palabra'
            : 'Presiona la palabra que coincide con el color del círculo'}
        </p>
        <p className="progreso">
          Juego {modoJuego === 'textoAColor' ? '1' : '2'} de 2
        </p>
      </div>
        {/* el juego con ronda actual */}
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
          {/* respuestas de ronda */}
        <div className="area-opciones">
          {opciones.map((color, indice) => {
            const esSeleccionado = botonSeleccionado === indice;
            const esCorrecto = esSeleccionado && respuestaCorrecta;
            const esIncorrecto = esSeleccionado && !respuestaCorrecta;
            return (
              <button
                key={indice}
                className={`boton-opcion ${esCorrecto ? 'boton-correcto' : ''} ${esIncorrecto ? 'boton-incorrecto' : ''}`}
                onClick={() => manejarRespuesta(color, indice)}
                disabled={!juegoActivo || botonSeleccionado !== null}
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
            );
          })}
        </div>
        {/* Cartel de mensaje */}
        <div className="contenedor-mensaje">
          {mensaje && !mensaje.includes('¡Segundo juego!') && (
            <div className={`mensaje ${mensaje.includes('¡Correcto!') ? 'mensaje-correcto' : 'mensaje-incorrecto'}`}>
              {mensaje}
            </div>
          )}
        </div>
        {/* boton para alternar juego */}
        <button 
          className="boton-cambiar-modo" 
          onClick={cambiarModoJuego}
          disabled={!juegoActivo}
        >
          Cambiar Modo de Juego
        </button>
      </div>
    </div>
  );
};

export default Colores;