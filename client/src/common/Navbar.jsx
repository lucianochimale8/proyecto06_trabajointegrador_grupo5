import { NavLink , useNavigate } from "react-router-dom";
import { useState, useEffect , useRef } from "react";
import { useAutorizacion } from "../hooks/useAutorizacion";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const tabs = [
    {
      label: "Proyectos",
      dropdown: [
        {
          path: "/proyecto2/CalculadorDePromedio",
          label: "Calculadora de Promedio",
        },
        { path: "/proyecto2/FormularioUNJU", label: "Formulario UNJU" },
        { path: "/proyecto2/NumeroMayor", label: "Numero más Alto" },
        {
          path: "/proyecto2/SimuladorDeSalario",
          label: "Simulador de Salario Mensual",
        },
        {
          path: "/proyecto2/SumaLaterales",
          label: "Suma de los Laterales de !",
        },
        { path: "/proyecto3/RegistroMascotas", label: "RegistroMascotas" },
        { path: "/proyecto3/ValorX", label: "Valor de X" },
        { path: "/proyecto4/AdivinaElnumero", label: "Adivinar el Numero" },
        { path: "/proyecto4/JuegoDeColores", label: "Juego de Colores" },
        {
          path: "/proyecto5/FormularioDeRegistro",
          label: "Formulario de Registro",
        },
        { path: "/proyecto5/JuegoEstrellas", label: "Juego de Estrellas" },
      ],
    },
    { path: "/DiagnosticoIngles/Ejercicio1", label: "Colours" },
    { path: "/DiagnosticoIngles/Ejercicio2", label: "Animals" },
    { path: "/Home", label: "Home" },
    { path: "/aboutMiembros", label: "Miembros" }
  ];

  const { user, isAuthenticated, logout } = useAutorizacion();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      {isAuthenticated && (
        <nav ref={navRef} className="app-navbar">
          {tabs.map((tab, index) => {
            if (tab.dropdown) {
              return (
                <div
                  key={index}
                  className="navbar-dropdown"
                  onMouseEnter={() => setOpen(true)}
                  onMouseLeave={() => setOpen(false)}
                >
                  <button
                    className="navbar-dropdown-button"
                    aria-expanded={open}
                    aria-haspopup="menu"
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpen((prev) => !prev);
                    }}
                  >
                    {tab.label} ▾
                  </button>
                  {open && (
                    <div className="navbar-dropdown-menu" role="menu">
                      {tab.dropdown.map((item, i) => (
                        <NavLink
                          key={i}
                          to={item.path}
                          className={({ isActive }) =>
                            isActive
                              ? "navbar-dropdown-item active"
                              : "navbar-dropdown-item"
                          }
                          onClick={() => setOpen(false)}
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
              <NavLink key={index} to={tab.path} className="navbar-link">
                {tab.label}
              </NavLink>
            );
          })}

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <span>Hola, {user?.name || user?.username}</span>
            <span>({user?.rol})</span>
            <button onClick={handleLogout} style={{ padding: "0.5rem 1rem" }}>
              Cerrar Sesión
            </button>
          </div>
        </nav>
      )}
    </>
  );
}
