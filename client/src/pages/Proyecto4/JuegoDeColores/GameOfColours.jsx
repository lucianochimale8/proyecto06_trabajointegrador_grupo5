import { useState } from "react";
import "../../../styles/global.css";

function Colores(){
    // arreglo de colores
    const colores = ['#fa9b9bff', '#a697f6ff', '#68e072ff', '#c27aecff'];
    // useStates
    const [colorDeBotones, setColorDeBotones] = useState(colores);
    const [mensaje, setMensaje] = useState("");
    
    // Función para mezclar un array (Fisher-Yates shuffle)
    const mezclarArray = (array) => {
        const nuevoArray = [...array];
        for (let i = nuevoArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [nuevoArray[i], nuevoArray[j]] = [nuevoArray[j], nuevoArray[i]];
        }
        return nuevoArray;
    };
    
    // Función para generar colores evitando repeticiones excesivas
    const generarColoresDiversos = () => {
        // Crear un pool de colores mezclados para mejor distribución
        let coloresPool = mezclarArray([...colores]);
        let indicePool = 0;
        const nuevosColores = [];
        const cuentaColores = {};
        
        // Inicializar contador de colores
        colores.forEach(color => {
            cuentaColores[color] = 0;
        });
        
        // Para cada botón, asignar un color diferente al que tenía
        for (let i = 0; i < colorDeBotones.length; i++) {
            const colorAnterior = colorDeBotones[i];
            let colorElegido = null;
            const maxRepeticiones = Math.ceil(colorDeBotones.length / colores.length);
            
            // Primero intentar usar colores del pool que sean diferentes al anterior
            for (let j = 0; j < coloresPool.length * 2; j++) {
                const colorCandidato = coloresPool[(indicePool + j) % coloresPool.length];
                
                // Verificar que sea diferente al anterior y no se haya usado demasiado
                if (colorCandidato !== colorAnterior && 
                    (cuentaColores[colorCandidato] || 0) < maxRepeticiones) {
                    colorElegido = colorCandidato;
                    cuentaColores[colorCandidato] = (cuentaColores[colorCandidato] || 0) + 1;
                    indicePool = (indicePool + j + 1) % coloresPool.length;
                    break;
                }
            }
            
            // Si no encontramos un color adecuado, buscar entre todos los colores
            if (!colorElegido) {
                // Buscar colores diferentes al anterior, ordenados por menor uso
                const coloresDiferentes = colores
                    .filter(c => c !== colorAnterior)
                    .sort((a, b) => (cuentaColores[a] || 0) - (cuentaColores[b] || 0));
                
                if (coloresDiferentes.length > 0) {
                    // Elegir el menos usado
                    colorElegido = coloresDiferentes[0];
                    cuentaColores[colorElegido] = (cuentaColores[colorElegido] || 0) + 1;
                } else {
                    // Último recurso: cualquier color diferente al anterior (no debería pasar)
                    const coloresDiferentes = colores.filter(c => c !== colorAnterior);
                    if (coloresDiferentes.length > 0) {
                        const indiceAleatorio = Math.floor(Math.random() * coloresDiferentes.length);
                        colorElegido = coloresDiferentes[indiceAleatorio];
                        cuentaColores[colorElegido] = (cuentaColores[colorElegido] || 0) + 1;
                    } else {
                        // Caso extremo: todos los colores son iguales al anterior
                        const indiceAleatorio = Math.floor(Math.random() * colores.length);
                        colorElegido = colores[indiceAleatorio];
                        cuentaColores[colorElegido] = (cuentaColores[colorElegido] || 0) + 1;
                    }
                }
            }
            
            nuevosColores.push(colorElegido);
            
            // Si hemos usado todos los colores del pool, regenerarlo mezclado
            if ((i + 1) % colores.length === 0) {
                coloresPool = mezclarArray([...colores]);
                indicePool = 0;
            }
        }
        
        // Mezclar una última vez para que el orden no sea predecible
        return mezclarArray(nuevosColores);
    };
    
    // Funcion que manejara el cambio de color dentro del boton
    const manejarClickEnElBoton = () => {
        // Generar nuevos colores con máxima diversidad
        const nuevosColores = generarColoresDiversos();
        
        // Cambiar el color segun el valor del nuevo color
        setColorDeBotones(nuevosColores);
        
        // .every comprueba si todos los elementos del array cumplen cierta condicion
        const todosIguales = nuevosColores.every((c) => c === nuevosColores[0]);
        
        // Si todos los colores son de indice igual (todos iguales) mostrar mensaje atravez de SetMensaje
        if (todosIguales) {
          setMensaje("¡Ganaste! Todos los colores son iguales!");
        } else {
          setMensaje(""); // Si no limpia el mensaje si no ganó
        }
    }
    
    return(
        <div style={{ 
            maxWidth: '800px', 
            margin: '20px auto', 
            padding: '24px',
            textAlign: 'center',
            fontFamily: "'KG Candy Cane Stripe', cursive"
        }}>
            <h1 style={{ 
                color: 'var(--kawaii-brown)', 
                fontFamily: "'Roundabout', cursive",
                marginBottom: '15px'
            }}>
                Juego de Colores
            </h1>
            <p style={{ 
                marginBottom: '20px',
                fontSize: '1.1rem',
                color: 'var(--kawaii-brown)'
            }}>
                Presiona cualquier botón para cambiar los colores. Si todos coinciden, ganas.
            </p>
            <div style={{ 
                display: 'flex', 
                gap: '15px', 
                justifyContent: 'center',
                flexWrap: 'wrap',
                marginBottom: '20px'
            }}>
                {colorDeBotones.map((color, index) => {
                    // Determinar si el color es claro u oscuro para ajustar el color del texto
                    // Los colores tienen formato #rrggbbaa, solo necesitamos RGB
                    const hex = color.replace('#', '').substring(0, 6);
                    const r = parseInt(hex.substring(0, 2), 16);
                    const g = parseInt(hex.substring(2, 4), 16);
                    const b = parseInt(hex.substring(4, 6), 16);
                    const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                    const textColor = brightness > 128 ? '#8B4513' : '#FFD93D';
                    
                    return (
                        <button
                            key={index}
                            onClick={() => manejarClickEnElBoton()}
                            className="modern-btn"
                            style={{
                                backgroundColor: color,
                                color: textColor,
                                minWidth: '120px',
                                minHeight: '50px',
                                border: '4px solid var(--kawaii-brown)'
                            }}
                        >
                            Botón {index+1}
                        </button>
                    );
                })}
            </div>
            {/* Mensaje de victoria , si hay mensaje mostrar el mensaje*/}
            {mensaje && (
                <h2 style={{ 
                    color: "#33ff00", 
                    fontSize: '1.5rem',
                    fontWeight: '900',
                    marginTop: '20px',
                    animation: 'aparecer 0.45s ease'
                }}>
                    {mensaje}
                </h2>
            )}
        </div>
    );
}

export default Colores;
