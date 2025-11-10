import { useState, useEffect, useRef } from 'react';

import cebra from "../../../assets/img/imageAnimal/cebra.png";
import leon from "../../../assets/img/imageAnimal/leon.png";
import elefante from "../../../assets/img/imageAnimal/rinoceronte.png";
import jirafa from "../../../assets/img/imageAnimal/jirafa.png";
import tigre from "../../../assets/img/imageAnimal/tigre.png";
import hipopotamo from "../../../assets/img/imageAnimal/hipopotamo.png";

// importar sonidos para el juego
import sonidoCorrecto from "../../../assets/audio/correct.mp3";
import sonidoError from "../../../assets/audio/gameover.mp3";
import sonidoGanar from "../../../assets/audio/win.mp3";

import '../../../styles/animales.css';

const Animals = () => {
    const animales = [
        { nombre: 'cebra', english: 'zebra', imagen: cebra },
        { nombre: 'león', english: 'lion', imagen: leon },
        { nombre: 'rinoceronte', english: 'rhinoceros', imagen: elefante },
        { nombre: 'jirafa', english: 'giraffe', imagen: jirafa },
        { nombre: 'tigre', english: 'tiger', imagen: tigre },
        { nombre: 'hipopotamo', english: 'hippopotamus', imagen: hipopotamo },
    ];

    const WINNING_SCORE = 6;

    const [animalActual, setAnimalActual] = useState(null);
    const [opciones, setOpciones] = useState([]);
    const [puntaje, setPuntaje] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [gameState, setGameState] = useState('playing');
    const [resultados, setResultados] = useState(null);
    const [botonSeleccionado, setBotonSeleccionado] = useState(null);
    const [respuestaCorrecta, setRespuestaCorrecta] = useState(null);

    // referencias para el sonido
    const sonidoCorrectoRef = useRef(null);
    const sonidoErrorRef = useRef(null);
    const sonidoGanarRef = useRef(null);

    // inicializar los sonidos
    useEffect(() => {
        sonidoCorrectoRef.current = new Audio(sonidoCorrecto);
        sonidoCorrectoRef.current.volume = 0.5;
        sonidoCorrectoRef.current.preload = 'auto';
        
        sonidoErrorRef.current = new Audio(sonidoError);
        sonidoErrorRef.current.volume = 0.5;
        sonidoErrorRef.current.preload = 'auto';
        
        sonidoGanarRef.current = new Audio(sonidoGanar);
        sonidoGanarRef.current.volume = 0.6;
        sonidoGanarRef.current.preload = 'auto';
    }, []);

    // funcion robusta para reproducir sonidos
    const reproducirSonido = (sonidoRef) => {
        if (sonidoRef && sonidoRef.current) {
            try {
                if (sonidoRef.current.currentTime > 0) {
                    sonidoRef.current.currentTime = 0;
                }
                const playPromise = sonidoRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        if (error.name !== 'NotAllowedError' && error.name !== 'NotSupportedError') {
                            try {
                                sonidoRef.current.load();
                                sonidoRef.current.currentTime = 0;
                                sonidoRef.current.play().catch(() => {});
                            } catch (e) {}
                        }
                    });
                }
            } catch (error) {}
        }
    };

    const generarJuego = () => {
        if (gameState === 'won') return; // Stop generating new games if already won
        const indiceAleatorio = Math.floor(Math.random() * animales.length);
        const animalObjetivo = animales[indiceAleatorio];
        setAnimalActual(animalObjetivo);

        const opcionesAleatorias = [...animales]
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const objetivoPresente = opcionesAleatorias.find(opcion => 
            opcion.nombre === animalObjetivo.nombre
        );

        if (!objetivoPresente) {
            opcionesAleatorias[0] = animalObjetivo;
        }

        const opcionesMezcladas = [...opcionesAleatorias].sort(() => Math.random() - 0.5);
        setOpciones(opcionesMezcladas);
        setMensaje('');
        setBotonSeleccionado(null);
        setRespuestaCorrecta(null);
    };

    useEffect(() => {
        generarJuego();
    }, []);

    const manejarRespuesta = (animalSeleccionado, indice) => {
        if (gameState === 'won') return;
        if (botonSeleccionado !== null) return;
        
        const esCorrecto = animalSeleccionado.nombre === animalActual.nombre;
        setBotonSeleccionado(indice);
        setRespuestaCorrecta(esCorrecto);
        
        if (esCorrecto) {
            // Reproducir sonido de acierto
            reproducirSonido(sonidoCorrectoRef);
            setPuntaje(prevPuntaje => {
                const newPuntaje = prevPuntaje + 1;
                if (newPuntaje >= WINNING_SCORE) {
                    setMensaje('¡Felicidades! ¡Has ganado!');
                    setGameState('won');
                    setResultados({ total: newPuntaje, maximo: WINNING_SCORE });
                    // Reproducir sonido de victoria cuando se muestra la pantalla de resultados
                    setTimeout(() => {
                        reproducirSonido(sonidoGanarRef);
                    }, 800);
                } else {
                    setMensaje('¡Correcto!');
                }
                return newPuntaje;
            });
        } else {
            // Reproducir sonido de error
            reproducirSonido(sonidoErrorRef);
            setMensaje(`¡Oops! Era ${animalActual.english}`);
        }
        
        setTimeout(() => {
            if (gameState !== 'won') {
                generarJuego();
            }
        }, 1500);
    };

    const reiniciarJuego = () => {
        setPuntaje(0);
        setMensaje('');
        setGameState('playing');
        setResultados(null);
        setBotonSeleccionado(null);
        setRespuestaCorrecta(null);
        generarJuego();
    };

    // Si el juego ha terminado, mostrar solo la pantalla de resultados
    if (gameState === 'won' && resultados) {
        return (
            <div className="juego-animales">
                <div className="encabezado-juego" style={{ justifyContent: 'center' }}>
                    <h1 className="titulo-juego" style={{ position: 'static', textAlign: 'center' }}>¡Felicidades! ¡Has ganado!</h1>
                </div>
                <div className="contenedor-resultados">
                    <div className="resultado-total">
                        <h2>Puntuación Final</h2>
                        <p>{resultados.total}/{resultados.maximo} puntos</p>
                        <p className="porcentaje">
                            {Math.round((resultados.total / resultados.maximo) * 100)}% de aciertos
                        </p>
                    </div>
                    <button className="boton-reiniciar" onClick={reiniciarJuego}>
                        Jugar de Nuevo
                    </button>
                </div>
            </div>
        );
    }

    // Pantalla de juego normal
    return (
        <div className="juego-animales">
            <div className="encabezado-juego">
                <h1 className="titulo-juego">Ejercicio de Animales</h1>
                <div className="puntaje">Puntos: {puntaje}</div>
            </div>

            <div className="instrucciones">
                <p>Presiona la palabra que coincide con la imagen</p>
            </div>

            <div className="contenedor-juego">
                <div className="area-pregunta">
                    <div className="imagen-animal">
                        <img 
                            src={animalActual?.imagen} 
                            alt={animalActual?.english}
                            className="imagen-pregunta"
                        />
                    </div>
                </div>

                <div className="area-opciones">
                    {opciones.map((animal, indice) => {
                        const esSeleccionado = botonSeleccionado === indice;
                        const esCorrecto = esSeleccionado && respuestaCorrecta;
                        const esIncorrecto = esSeleccionado && !respuestaCorrecta;
                        return (
                            <button
                                key={indice}
                                className={`boton-opcion ${esCorrecto ? 'boton-correcto' : ''} ${esIncorrecto ? 'boton-incorrecto' : ''}`}
                                onClick={() => manejarRespuesta(animal, indice)}
                                disabled={botonSeleccionado !== null}
                            >
                                <span className="opcion-texto">{animal.english}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Cartel de mensaje */}
                <div className="contenedor-mensaje">
                    {mensaje && !mensaje.includes('¡Felicidades!') && (
                        <div className={`mensaje ${mensaje.includes('¡Correcto!') ? 'mensaje-correcto' : 'mensaje-incorrecto'}`}>
                            {mensaje}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Animals;