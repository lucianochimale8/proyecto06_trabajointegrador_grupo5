import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const tabs = [
    { label: "Proyectos", dropdown: [
      { path: "/proyecto2/CalculadorDePromedio", label: "Calculadora de Promedio" },
      { path: "/proyecto2/FormularioUNJU", label: "Formulario UNJU" },
      { path: "/proyecto2/NumeroMayor", label: "Numero más Alto" },
      { path: "/proyecto2/SimuladorDeSalario", label: "Simulador de Salario Mensual" },
      { path: "/proyecto2/SumaLaterales", label: "Suma de los Laterales de !" },
      { path: "/proyecto3/RegistroMascotas", label: "RegistroMascotas" },
      { path: "/proyecto3/ValorX", label: "Valor de X" },
      { path: "/proyecto4/AdivinaElnumero", label: "Adivinar el Numero" },
      { path: "/proyecto4/JuegoDeColores", label: "Juego de Colores" },
      { path: "/proyecto5/FormularioDeRegistro", label: "Formulario de Registro" },
      { path: "/proyecto5/JuegoEstrellas", label: "Juego de Estrellas" },
    ]},
    { path: "/DiagnosticoIngles/Ejercicio1", label: "Colours" },    
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
        background: "linear-gradient(90deg, #adebb3ff, #7aec86ff, #adebb3ff)",
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
                  color: "black",
                  fontSize: "20px",
                  fontFamily: "Arial, sans-serif",
                  cursor: "pointer",
                  padding: "0px 10px",
                }}
              >
                {tab.label} ▾
              </button>
              {open && (
                <div
                  style={{
                    position: "absolute",
                    top: "20px",
                    background: "white",
                    fontFamily: "Arial, sans-serif",
                    borderRadius: "8px",
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
                        e.target.style.background = "#adebb3ff";
                        e.target.style.color = "#4400ffff";
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
              color: "black",
              textDecoration: "none",
              fontSize: "20px",
              fontFamily: "Arial, sans-serif",
              padding:"0px 30px",
            }}
          >
            {tab.label}
          </NavLink>
        );
      })}
    </nav>
  );
}