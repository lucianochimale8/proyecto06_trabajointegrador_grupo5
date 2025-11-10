import React, { useState } from "react";
import "../../../styles/cuerpo.css";

import cuerpo from "../../../assets/img/ImageBody/cuerpo.png";

import head from "../../../assets/img/ImageBody/cabeza.png";
import ear from "../../../assets/img/ImageBody/oreja.png";
import eye from "../../../assets/img/ImageBody/ojo.png";
import nose from "../../../assets/img/ImageBody/nariz.png";
import mouth from "../../../assets/img/ImageBody/boca.png";
import arm from "../../../assets/img/ImageBody/brazo.png";
import hand from "../../../assets/img/ImageBody/mano.png";
import leg from "../../../assets/img/ImageBody/piernas.png";
import foot from "../../../assets/img/ImageBody/pie.png";
import lip from "../../../assets/img/ImageBody/labios.png";

const BodyParts = () => {
  // piezas disponibles
  const bodyParts = [
    { id: "head", img: head },
    { id: "ear", img: ear },
    { id: "eye", img: eye },
    { id: "nose", img: nose },
    { id: "mouth", img: mouth },
    { id: "arm", img: arm },
    { id: "hand", img: hand },
    { id: "leg", img: leg },
    { id: "foot", img: foot },
    { id: "lip", img: lip },
  ];

  const [slots, setSlots] = useState([
    { id: "head", filled: false },
    { id: "ear", filled: false },
    { id: "eye", filled: false },
    { id: "nose", filled: false },
    { id: "mouth", filled: false },
    { id: "arm", filled: false },
    { id: "hand", filled: false },
    { id: "leg", filled: false },
    { id: "foot", filled: false },
    { id: "lip", filled: false },
  ]);

  const [completed, setCompleted] = useState(false);

  const playSound = (type) => {
    const sound =
      type === "correct"
        ? new Audio(correctSound)
        : new Audio(wrongSound);
    sound.play();
  };

  const handleDragStart = (e, id) => {
    e.dataTransfer.setData("id", id);
  };

  const handleDrop = (targetId) => {
    const draggedId = event.dataTransfer.getData("id");
    if (draggedId === targetId) {
      setSlots((prev) =>
        prev.map((slot) =>
          slot.id === targetId ? { ...slot, filled: true } : slot
        )
      );
      playSound("correct");

      // si todos los slots están completos
      const allFilled = slots.every(
        (slot) => slot.id === targetId || slot.filled
      );
      if (allFilled) setCompleted(true);
    } else {
      playSound("wrong");
      const el = document.querySelector(`.slot[data-id="${targetId}"]`);
      if (el) {
        el.classList.add("shake");
        setTimeout(() => el.classList.remove("shake"), 300);
      }
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // posiciones de los slots sobre el cuerpo
  const posiciones = {
    head: { top: "30px", left: "35px" },
    ear: { top: "95px", left: "35px" },
    eye: { top: "30px", left: "255px" },
    nose: { top: "160px", left: "35px" },
    mouth: { top: "225px", left: "35px" },
    arm: { top: "160px", left: "255px" },
    hand: { top: "290px", left: "35px" },
    leg: { top: "225px", left: "255px" },
    foot: { top: "290px", left: "255px" },
    lip: { top: "95px", left: "255px" },
  };

  return (
    <div className="body-game-container">
      <h2>Arrastra las partes del cuerpo</h2>

      <div className="body-area">
        <img src={cuerpo} alt="Cuerpo" className="cuerpo" />

        {slots.map((slot) => (
          <div
            key={slot.id}
            data-id={slot.id}
            className={`slot ${slot.filled ? "filled" : ""}`}
            style={{
              position: "absolute",
              ...posiciones[slot.id],
            }}
            onDrop={() => handleDrop(slot.id)}
            onDragOver={handleDragOver}
          ></div>
        ))}
      </div>

      <div className="parts-container">
        {bodyParts.map((part) => (
          <img
            key={part.id}
            src={part.img}
            alt={part.id}
            draggable={!slots.find((s) => s.id === part.id)?.filled}
            onDragStart={(e) => handleDragStart(e, part.id)}
            className={`part ${
              slots.find((s) => s.id === part.id)?.filled ? "hidden" : ""
            }`}
          />
        ))}
      </div>

      {completed && (
        <div className="congratulations">
           ¡Excelente! Completaste el cuerpo humano 
        </div>
      )}
    </div>
  );
};

export default BodyParts;