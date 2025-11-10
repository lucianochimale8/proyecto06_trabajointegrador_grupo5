import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const location = useLocation();

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
    ], id: "proyectos" },
    { label: "Juegos", dropdown: [
      { path: "/DiagnosticoIngles/Ejercicio2", label: "Animals" },
      { path: "/DiagnosticoIngles/Ejercicio1", label: "Colors" },
    ], id: "juegos" },
    { path: "/Home", label: "Home" },
    { path: "/aboutMiembros", label: "Miembros" },
    { path: "/login", label: "Login" },
  ];

  const navRef = useRef(null);

  // Detectar si estamos en una página de proyecto
  const isProjectPage = location.pathname.startsWith('/proyecto');
  // Detectar si estamos en una página de juego
  const isGamePage = location.pathname.startsWith('/DiagnosticoIngles');

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <nav ref={navRef} className="app-navbar">
      {tabs.map((tab, index) => {
        if (tab.dropdown) {
          const isOpen = openDropdown === tab.id;
          const isActive = (tab.id === "proyectos" && isProjectPage) || (tab.id === "juegos" && isGamePage);
          
          return (
            <div
              key={index}
              className="navbar-dropdown"
              onMouseEnter={() => setOpenDropdown(tab.id)}
              onMouseLeave={() => setOpenDropdown(null)}
            >
              <button
                className={`navbar-dropdown-button ${isActive ? 'active-project' : ''}`}
                aria-expanded={isOpen}
                aria-haspopup="menu"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  setOpenDropdown(isOpen ? null : tab.id); 
                }}
              >
                {tab.label} ▾
              </button>
              {isOpen && (
                <div className="navbar-dropdown-menu" role="menu">
                  {tab.dropdown.map((item, i) => (
                    <NavLink
                      key={i}
                      to={item.path}
                      className={({ isActive }) =>
                        isActive ? "navbar-dropdown-item active" : "navbar-dropdown-item"
                      }
                      onClick={() => setOpenDropdown(null)}
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
            className="navbar-link"
          >
            {tab.label}
          </NavLink>
        );
      })}
    </nav>
  );
}