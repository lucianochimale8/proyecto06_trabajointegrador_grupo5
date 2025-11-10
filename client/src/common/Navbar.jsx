import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showMessage, setShowMessage] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, username, logout } = useAuth();

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
    <>
      {showMessage && (
        <div 
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            backgroundColor: '#ff6b6b',
            color: 'white',
            padding: '15px 20px',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            zIndex: 9999,
            animation: 'fadeIn 0.3s ease-in'
          }}
        >
          Inicia sesión para acceder a esta sección
        </div>
      )}
      <nav ref={navRef} className="app-navbar" style={{ position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifyContent: 'center', width: '100%' }}>
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
                  {tab.dropdown.map((item, i) => {
                    // Si es la sección de juegos y no está autenticado
                    if (tab.id === "juegos" && !isAuthenticated) {
                      return (
                        <div
                          key={i}
                          className="navbar-dropdown-item"
                          onClick={(e) => {
                            e.preventDefault();
                            setOpenDropdown(null);
                            setShowMessage(true);
                            setTimeout(() => setShowMessage(false), 3000);
                            navigate('/login', { 
                              state: { 
                                from: item.path, 
                                requiresAuth: true 
                              } 
                            });
                          }}
                          style={{ cursor: 'pointer' }}
                        >
                          {item.label}
                        </div>
                      );
                    }
                    return (
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
                    );
                  })}
                </div>
              )}
            </div>
          );
        }

        // Ocultar Login si está autenticado pero mantener el espacio
        if (tab.path === "/login" && isAuthenticated) {
          return (
            <NavLink
              key={index}
              to={tab.path}
              className="navbar-link"
              style={{ visibility: 'hidden', width: 0, padding: 0, margin: 0 }}
            >
              {tab.label}
            </NavLink>
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
        </div>
      {/* Mostrar saludo y botón cerrar sesión si está autenticado */}
      {isAuthenticated && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '15px',
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)'
        }}>
          <span style={{ 
            color: 'var(--kawaii-brown)', 
            fontWeight: '600',
            fontSize: '16px'
          }}>
            Hola, {username}
          </span>
          <button
            className="modern-btn"
            onClick={() => {
              logout();
              navigate('/login', { replace: true });
            }}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              cursor: 'pointer'
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
      </nav>
    </>
  );
}