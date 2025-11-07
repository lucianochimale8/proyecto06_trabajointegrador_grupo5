import { useState, useEffect } from 'react';

import cebra from "../../../assets/img/imageAnimal/cebra.png";
import leon from "../../../assets/img/imageAnimal/leon.png";
import elefante from "../../../assets/img/imageAnimal/rinoceronte.png";
import jirafa from "../../../assets/img/imageAnimal/jirafa.png";
import tigre from "../../../assets/img/imageAnimal/tigre.png";
import hipopotamo from "../../../assets/img/imageAnimal/hipopotamo.png";


import '../../../styles/colores.css';

const Animals = () => {
    const animales = [
        { nombre: 'zebra', espanol: 'zebra', imagen: cebra },
        { nombre: 'lion', espanol: 'lion', imagen: leon },
        { nombre: 'rinoceronte', espanol: 'rinoceronte', imagen: elefante },
        { nombre: 'jirafa', espanol: 'giraffe', imagen: jirafa },
        { nombre: 'tigre', espanol: 'tiger', imagen: tigre },
        { nombre: 'hipopotamo', espanol: 'hippo', imagen: hipopotamo },
    ];

    const [animalActual, setAnimalActual] = useState(null);
    const [opciones, setOpciones] = useState([]);
    const [puntaje, setPuntaje] = useState(0);
    const [mensaje, setMensaje] = useState('');
    const [modoJuego, setModoJuego] = useState('textoAImagen');

    const generarJuego = () => {
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
    };

    useEffect(() => {
        generarJuego();
    }, []);

    const manejarRespuesta = (animalSeleccionado) => {
        if (modoJuego === 'textoAImagen') {
            if (animalSeleccionado.nombre === animalActual.nombre) {
                setPuntaje(puntaje + 1);
                setMensaje('¡Correcto!');
            } else {
                setMensaje(`¡Oops! Era ${animalActual.espanol}`);
            }
        } else {
            if (animalSeleccionado.nombre === animalActual.nombre) {
                setPuntaje(puntaje + 1);
                setMensaje('¡Correcto!');
            } else {
                setMensaje(`¡Oops! Era ${animalActual.espanol}`);
            }
        }
        
        setTimeout(() => {
            generarJuego();
        }, 1500);
    };

    const cambiarModoJuego = () => {
        setModoJuego(modoJuego === 'textoAImagen' ? 'imagenATexto' : 'textoAImagen');
        setTimeout(() => {
            generarJuego();
        }, 300);
    };

    return (
        <div className="juego-animales">
            <div className="encabezado-juego">
                <h1 className="titulo-juego">Ejercicio de Animales</h1>
                <div className="puntaje">Puntos: {puntaje}</div>
            </div>

            <div className="instrucciones">
                <p>
                    {modoJuego === 'textoAImagen' 
                        ? 'Presiona la imagen que coincide con la palabra'
                        : 'Presiona la palabra que coincide con la imagen'}
                </p>
            </div>

            <div className="contenedor-juego">
                <div className="area-pregunta">
                    {modoJuego === 'textoAImagen' ? (
                        <div className="palabra-animal">
                            {animalActual?.espanol}
                        </div>
                    ) : (
                        <div className="imagen-animal">
                            <img 
                                src={animalActual?.imagen} 
                                alt={animalActual?.espanol}
                                className="imagen-pregunta"
                            />
                        </div>
                    )}
                </div>

                <div className="area-opciones">
                    {opciones.map((animal, indice) => (
                        <button
                            key={indice}
                            className="boton-opcion"
                            onClick={() => manejarRespuesta(animal)}
                        >
                            {modoJuego === 'textoAImagen' ? (
                                <div className="opcion-imagen">
                                    <img 
                                        src={animal.imagen} 
                                        alt={animal.espanol}
                                        className="imagen-opcion"
                                    />
                                </div>
                            ) : (
                                <span className="opcion-texto">{animal.espanol}</span>
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

export default Animals;