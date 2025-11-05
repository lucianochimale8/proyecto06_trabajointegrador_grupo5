import { NavLink } from "react-router-dom";
import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const tabs = [
    { label: "Proyectos", dropdown: [
      { path: "/proyecto2", label: "Simulador de Salario Mensual" },
      { path: "/proyecto3", label: "Valor de X" },
      { path: "/proyecto4/AdivinaElnumero", label: "Adivinar el Numero" },
      { path: "/proyecto4/JuegoDeColores", label: "Juego de Colores" },
      { path: "/proyecto5", label: "Proyecto 5" },
    ]},    
    { path: "/Home", label: "Home" },
    { path: "/aboutMiembros", label: "Miembros" },
    { path: "/login", label: "Login" },
  ];

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
        background: "linear-gradient(90deg, #8b5cf6, #6366f1, #3b82f6)",
        padding: "15px",
        borderRadius: "12px",
        width: "90%",
        margin: "20px auto",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
      }}
    >
      {tabs.map((tab, index) => {
        if (tab.dropdown) {
          return (
            <div
              key={index}
              style={{ position: "relative" }}
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <button
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  fontSize: "16px",
                  cursor: "pointer",
                  padding: "8px 12px",
                }}
              >
                {tab.label} ▾
              </button>
              {open && (
                <div
                  style={{
                    position: "absolute",
                    top: "35px",
                    background: "white",
                    borderRadius: "8px",
                    padding: "8px 0",
                    boxShadow: "0 5px 10px rgba(0,0,0,0.2)",
                    minWidth: "150px",
                    zIndex: 10,
                  }}
                >
                  {tab.dropdown.map((item, i) => (
                    <NavLink
                      key={i}
                      to={item.path}
                      style={({ isActive}) => ({
                        display: "block",
                        padding: "10px 16px",
                        textDecoration: "none",
                        color: "#050505ff",
                        background: isActive? "#ffffffff" : "white",
                        transition: "background 0.2s, color 0.2s",
                      })}
                      onMouseEnter={(e) => {
                        e.target.style.background = "#f3f4f6";
                        e.target.style.color = "#313c9eff";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = "white";
                        e.target.style.color = "#000000ff";
                      }}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <NavLink
            key={index}
            to={tab.path}
            style={{
              color: "white",
              textDecoration: "none",
              fontSize: "16px",
            }}
          >
            {tab.label}
          </NavLink>
        );
      })}
    </nav>
  );
}