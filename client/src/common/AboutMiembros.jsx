import { useState } from "react";
import miembros from "../data/Miembros.js";

const AboutMiembros = () => {
  const [showCarousel, setShowCarousel] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStart = () => {
    setShowCarousel(true);
    setCurrentIndex(0);
  };

  const handleNext = () => {
    if (currentIndex < miembros.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleClose = () => {
    setShowCarousel(false);
    setCurrentIndex(0);
  };

  if (!showCarousel) {
    return (
      <section className="container py-5">
        <div className="about-welcome-container">
          <div className="about-welcome-card modern-card">
            <h1 className="about-welcome-title">Conoce a los integrantes del grupo!</h1>
            <button className="modern-btn" onClick={handleStart}>
              Vamos!
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container py-5">
      <div className="about-carousel-container">
        <div className="about-carousel-wrapper">
          {currentIndex > 0 && (
            <button className="about-arrow-btn about-arrow-left" onClick={handlePrevious}>
              ‹
            </button>
          )}
          <div className="about-carousel-card">
            <div className="id-card-image-wrapper">
              <img 
                src={miembros[currentIndex].img} 
                alt={miembros[currentIndex].name}
                className="id-card-image-only"
              />
            </div>
            <button className="about-back-btn modern-btn" onClick={handleClose}>
              Atrás
            </button>
          </div>
          {currentIndex < miembros.length - 1 && (
            <button className="about-arrow-btn about-arrow-right" onClick={handleNext}>
              ›
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default AboutMiembros;