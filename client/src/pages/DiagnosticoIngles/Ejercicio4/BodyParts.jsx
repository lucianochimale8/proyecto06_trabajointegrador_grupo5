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
  const partSizes = {
    head: { width: "100px", height: "100px" },
    ear: { width: "100px", height: "100px" },
    eye: { width: "100px", height: "100px" },
    nose: { width: "100px", height: "100px" },
    mouth: { width: "100px", height: "100px" },
    arm: { width: "100px", height: "100px" },
    hand: { width: "100px", height: "100px" },
    leg: { width: "100px", height: "100px" },
    foot: { width: "100px", height: "100px" },
    lip: { width: "100px", height: "100px" }
  };

  const slotSizes = {
    head: { width: "90px", height: "90px" },
    ear: { width: "90px", height: "90px" },
    eye: { width: "90px", height: "90px" },
    nose: { width: "90px", height: "90px" },
    mouth: { width: "90px", height: "90px" },
    arm: { width: "90px", height: "90px" },
    hand: { width: "90px", height: "90px" },
    leg: { width: "90px", height: "90px" },
    foot: { width: "90px", height: "90px" },
    lip: { width: "90px", height: "90px" }
  };

  // piezas disponibles
  const bodyParts = [
    { id: "head", img: head, label: "Cabeza" },
    { id: "ear", img: ear, label: "Oreja" },
    { id: "eye", img: eye, label: "Ojo" },
    { id: "nose", img: nose, label: "Nariz" },
    { id: "mouth", img: mouth, label: "Boca" },
    { id: "arm", img: arm, label: "Brazo" },
    { id: "hand", img: hand, label: "Mano" },
    { id: "leg", img: leg, label: "Pierna" },
    { id: "foot", img: foot, label: "Pie" },
    { id: "lip", img: lip, label: "Labios" },
  ];

  const [slots, setSlots] = useState(bodyParts.map(part => ({ 
    id: part.id, 
    filled: false 
  })));

  const [completed, setCompleted] = useState(false);

  const playSound = (type) => {
    console.log(type + " sound");
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

      const allFilled = slots.every(
        (slot) => slot.id === targetId || slot.filled
      );
      if (allFilled) setCompleted(true);
    } else {
      playSound("wrong");
      const el = document.querySelector(`.slot[data-id="${targetId}"]`);
      if (el) {
        el.classList.add("shake");
        setTimeout(() => el.classList.remove("shake"), 400);
      }
    }
  };

  const handleDragOver = (e) => e.preventDefault();

  // posiciones (usando porcentajes relativos al contenedor de 800x600px para mantener posiciones fijas)
  const posiciones = {
    head: { top: "9.17%", left: "34.13%" },
    ear: { top: "28.33%", left: "34.13%" },
    eye: { top: "9.17%", left: "81.63%" },
    nose: { top: "47.5%", left: "34.13%" },
    mouth: { top: "66.67%", left: "34.13%" },
    arm: { top: "47.17%", left: "81.88%" },
    hand: { top: "85%", left: "34.13%" },
    leg: { top: "66.67%", left: "81.63%" },
    foot: { top: "85%", left: "81.88%" },
    lip: { top: "28.33%", left: "81.63%" },
  };

  return (
    <div className="body-game-container">
      <h2> Arrastra las partes del cuerpo </h2>

      <div className="body-area">
        <img src={cuerpo} alt="Cuerpo humano" className="cuerpo" />

        {slots.map((slot) => (
          <div
            key={slot.id}
            data-id={slot.id}
            className={`slot ${slot.filled ? "filled" : ""}`}
            style={{
              position: "absolute",
              ...posiciones[slot.id],
              ...slotSizes[slot.id]
            }}
            onDrop={() => handleDrop(slot.id)}
            onDragOver={handleDragOver}
            title={bodyParts.find(p => p.id === slot.id)?.label}
          ></div>
        ))}
      </div>

      <div className="parts-container">
        {bodyParts.map((part) => (
          <div
            key={part.id}
            data-part={part.id}
            className={`part ${
              slots.find((s) => s.id === part.id)?.filled ? "hidden" : ""
            }`}
            style={partSizes[part.id]}
            draggable={!slots.find((s) => s.id === part.id)?.filled}
            onDragStart={(e) => handleDragStart(e, part.id)}
            title={part.label}
          >
            <img
              src={part.img}
              alt={part.label}
            />
          </div>
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