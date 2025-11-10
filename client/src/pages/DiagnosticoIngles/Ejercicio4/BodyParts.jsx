import React, { useState } from 'react';
import '../../../styles/cuerpo.css';
import cabeza from "../../../assets/img/ImageBody/cabeza.png";
import oreja from "../../../assets/img/ImageBody/oreja.png";
import ojo from "../../../assets/img/ImageBody/ojo.png";
import nariz from "../../../assets/img/ImageBody/nariz.png";
import boca from "../../../assets/img/ImageBody/boca.png";
import brazo from "../../../assets/img/ImageBody/brazo.png";
import mano from "../../../assets/img/ImageBody/mano.png";
import pierna from "../../../assets/img/ImageBody/piernas.png";
import pie from "../../../assets/img/ImageBody/pie.png";
import cuerpo from "../../../assets/img/ImageBody/cuerpo.png";

// import sonidoCorrecto from "../../../assets/audio/correct.mp3";
// import sonidoError from "../../../assets/audio/gameover.mp3";
// import sonidoGanar from "../../../assets/audio/win.mp3";

const partesDelCuerpo = [
  { id: 1, name: "head", img: cabeza },
  { id: 2, name: "ear", img: oreja },
  { id: 3, name: "eye", img: ojo },
  { id: 4, name: "nose", img: nariz },
  { id: 5, name: "mouth", img: boca },
  { id: 6, name: "arm", img: brazo },
  { id: 7, name: "hand", img: mano },
  { id: 8, name: "leg", img: pierna },
  { id: 9, name: "foot", img: pie },
];

export default function BodyParts() {
  const [slots, setSlots] = useState(
    partesDelCuerpo.map((part) => ({ ...part, filled: false }))
  );
  const [draggedPart, setDraggedPart] = useState(null);

  const handleDragStart = (part) => {
    setDraggedPart(part);
  };

  const handleDrop = (targetId) => {
    if (draggedPart && draggedPart.id === targetId) {
      setSlots((prev) =>
        prev.map((slot) =>
          slot.id === targetId ? { ...slot, filled: true } : slot
        )
      );
      setDraggedPart(null);
    } else {
      
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  const completed = slots.every((s) => s.filled);

  return (
    <div className="body-game">
      <h2>Completa el juego con las partes que le corresponda</h2>

      <div className="cuerpo-area">
        <img src={cuerpo} alt="Cuerpo" className="cuerpo"/>
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
              <img src={slot.img} alt={slot.name} className="slot-img" />
            ) : (
              <span>{slot.name}</span>
            )}
          </div>
        ))}
      </div>

      <div className="draggable-parts">
        {partesDelCuerpo
          .filter((p) => !slots.find((s) => s.id === p.id && s.filled))
          .map((part) => (
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

      {completed && (
        <p className="success-msg"> ¡Muy bien! Has completado el cuerpo.</p>
      )}
    </div>
  );
}