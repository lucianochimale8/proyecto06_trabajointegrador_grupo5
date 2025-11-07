import { useState, useEffect } from 'react';

import cebra from "../../../assets/img/imageAnimal/cebra.png";
import leon from "../../../assets/img/imageAnimal/leon.png";
import elefante from "../../../assets/img/imageAnimal/rinoceronte.png";
import jirafa from "../../../assets/img/imageAnimal/jirafa.png";
import tigre from "../../../assets/img/imageAnimal/tigre.png";
import hipopotamo from "../../../assets/img/imageAnimal/hipopotamo.png";


import '../../../styles/animales.css';

const Animals = () => {
    const animales = [
        { nombre: 'cebra', english: 'zebra', imagen: cebra },
        { nombre: 'león', english: 'lion', imagen: leon },
        { nombre: 'rinoceronte', english: 'rinoceronte', imagen: elefante },
        { nombre: 'jirafa', english: 'giraffe', imagen: jirafa },
        { nombre: 'tigre', english: 'tiger', imagen: tigre },
        { nombre: 'hipopotamo', english: 'hippopotamus', imagen: hipopotamo },
    ];

    const [animalActual, setAnimalActual] = useState(null);
    const [opciones, setOpciones] = useState([]);
    const [puntaje, setPuntaje] = useState(0);
    const [mensaje, setMensaje] = useState('');

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
        if (animalSeleccionado.nombre === animalActual.nombre) {
            setPuntaje(puntaje + 1);
            setMensaje('¡Correcto!');
        } else {
            setMensaje(`¡Oops! Era ${animalActual.english}`);
        }
        
        setTimeout(() => {
            generarJuego();
        }, 1500);
    };

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
                    {opciones.map((animal, indice) => (
                        <button
                            key={indice}
                            className="boton-opcion"
                            onClick={() => manejarRespuesta(animal)}
                        >
                            <span className="opcion-texto">{animal.english}</span>
                        </button>
                    ))}
                </div>

                {mensaje && (
                    <div className="mensaje">
                        {mensaje}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Animals;