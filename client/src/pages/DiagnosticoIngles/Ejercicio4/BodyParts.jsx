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
    head: { width: "70px", height: "70px" },
    ear: { width: "70px", height: "70px" },
    eye: { width: "70px", height: "70px" },
    nose: { width: "70px", height: "70px" },
    mouth: { width: "70px", height: "70px" },
    arm: { width: "70px", height: "70px" },
    hand: { width: "70px", height: "70px" },
    leg: { width: "70px", height: "70px" },
    foot: { width: "70px", height: "70px" },
    lip: { width: "70px", height: "70px" }
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

  const posiciones = {
  head: { top: "8%", left: "26.5%" },
  ear: { top: "22%", left: "26.5%" },
  eye: { top: "8%", left: "62%" },
  nose: { top: "36%", left: "26.5%" },
  mouth: { top: "51%", left: "26.5%" },
  arm: { top: "36%", left: "62%" },
  hand: { top: "65%", left: "26.5%" },
  leg: { top: "51%", left: "62%" },
  foot: { top: "65%", left: "62%" },
  lip: { top: "22%", left: "62%" },
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