import { NavLink } from "react-router-dom";
import React, { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const tabs = [
    { path: "/login", label: "Login" },
    {path: "/Home", label: "Home" },
    { path: "/aboutMiembros", label: "Miembros" },
    { label: "Proyectos", dropdown: [
      { path: "/proyecto2", label: "Proyecto 2" },
      { path: "/proyecto3", label: "Proyecto 3" },
      { path: "/proyecto4", label: "Proyecto 4" },
      { path: "/proyecto5", label: "Proyecto 5" },
    ]},
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
                        color: "#a74fafff",
                        background: isActive? "#ffffffff" : "white",
                        transition: "background 0.2s",
                      })}
                      onMouseEnter={(e)=>
                      (e.target.style.background = "#e6a964ff")
                      }
                      onMouseLeave={(e)=>
                      (e.target.style.background = isActive
                        ? "#ffffffff"  
                        : "white")
                      }
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