import React, { useState } from 'react';
import '../../../styles/cuerpo.css';

{/* import sonidoCorrecto from "../../../assets/audio/correct.mp3";
import sonidoError from "../../../assets/audio/gameover.mp3";
import sonidoGanar from "../../../assets/audio/win.mp3"; */}

const partesDelCuerpo = [
    {id: 1, name: "head", img: "../../../assets/img/ImageBody/cabeza.png"},
    {id: 2, name: "ear", img: "../../../assets/img/ImageBody/oreja.png"},
    {id: 3, name: "eye", img: "../../../assets/img/ImageBody/ojo.png"},
    {id: 4, name: "nose", img: "../../../assets/img/ImageBody/nariz.png"},
    {id: 5, name: "mouth", img: "../../../assets/img/ImageBody/boca.png"},
    {id: 6, name: "arm", img: "../../../assets/img/ImageBody/brazo.png"},
    {id: 7, name: "hand", img: "../../../assets/img/ImageBody/mano.png"},
    {id: 8, name: "leg", img: "../../../assets/img/ImageBody/pierna.png"},
    {id: 9, name: "foot", img: "../../../assets/img/ImageBody/pie.png"},
    {id: 10, name: "body", img: "../../../assets/img/ImageBody/cuerpo.png"},
];

export default function BodyGame(){
    const [slots, setSlots] = useState(
        partesDelCuerpo.map((part) => ({ ...part, filled: false}))
    );
    const [draggedPart, setDraggedPart] = useState(null);

    const handleDragStart = (part) => {
        setDraggedPart(part);
    };

    const handleDrop = (targetId) => {
        if (draggedPart && draggedPart.id === targetId) {
            setSlots((prev) =>
            prev.map((slot) =>
            slot.id === targetId ? { ...slot, filled: true} : slot
            )
          );
          setDraggedPart(null);
        }
    };

    const handleDragOver = (e) => e.preventDefault();

    const completed = slot.every((s) => s.filled);

    return (
        <div className= "body-game">
            <h2>Completa el juego con las partes que le corresponda</h2>

            <div className= "character-area">
                <img src= "/img/ImageBody/character.png" alt="Character" className="character-image" />
                {slots.map((slot, index) => (
                    <div
                    key={slot.id}
                    className={`slot ${slot.filled ? "filled" : ""}`}
                    onDrop={() => handleDrop(slot.id)}
                    onDragOver={handleDragOver}
                    style={{
                        top: `${40 + index * 40}px`,
                        left: index < 5 ? "-110px" : "300px",
                    }}
                    >
                        {slot.filled ? (
                            <img src={slot.img} alt={slot.name} className="slot-img"/>
                        ) : (
                            <span>{slot.name}</span>
                        )}
                    </div>
                  ))}
             </div>

             <div className="draggable-parts">
        {parts.filter((p) => !slots.find((s) => s.id === p.id && s.filled)).map((part) => (
          <img
            key={part.id}
            src={part.img}
            alt={part.name}
            draggable
            onDragStart={() => handleDragStart(part)}
            className="draggable-img"
          />
        ))}
      </div>

      {completed && <p className="success-msg"> ¡Muy bien! Has completado el cuerpo.</p>}
    </div>
  );
}