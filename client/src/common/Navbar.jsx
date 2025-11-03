import { NavLink } from "react-router-dom";
import React from "react";

export default function Navbar() {
    const tabs = [
    { path: "/login", label: "Login" },
    { path: "/proyecto2", label: "Proyecto 2" },
    { path: "/proyecto3", label: "Proyecto 3" },
    { path: "/proyecto4", label: "Proyecto 4" },
    { path: "/proyecto5", label: "Proyecto 5" },
    { path: "/aboutMiembros", label: "Mienbros" },
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
        margin: "20px auto",
        width: "90%",
        boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        }}
    >
        {tabs.map((tab) => (
        <NavLink
            key={tab.path}
            to={tab.path}
            style={({ isActive }) => ({
            color: isActive ? "#fff" : "#e0e7ff",
            background: isActive
                ? "rgba(255,255,255,0.2)"
                : "rgba(255,255,255,0.1)",
            padding: "10px 20px",
            borderRadius: "20px",
            textDecoration: "none",
            fontWeight: "bold",
            transition: "all 0.3s ease",
            })}
        >
            {tab.label}
        </NavLink>
        ))}
    </nav>
    );
}