import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import usuarioGuardado from "../data/usuarios.json";

export const AutorizacionContext = createContext(null);
const LS_KEY = "auth:user";
const USERS_KEY = "app:usuarios"; // donde se la "BD" de usuarios en localStorage

export function AutorizacionProvider({ children }) {
  // lista de todos los usuarios (base + registrados)
  const [users, setUsers] = useState(() => {
    try {
      const saved = localStorage.getItem(USERS_KEY);
      return saved ? JSON.parse(saved) : usuarioGuardado;
    } catch {
      localStorage.removeItem(USERS_KEY);
      return usuarioGuardado;
    }
  });

  const [user, setUser] = useState(() => {
    try {
      const usuarioAlmacenado = localStorage.getItem(LS_KEY);
      return usuarioAlmacenado ? JSON.parse(usuarioAlmacenado) : null;
    } catch {
      localStorage.removeItem(LS_KEY);
      return null;
    }
  });

  // guardar usuarios en localStorage cuando cambien
  useEffect(() => {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.error("No se pudo guardar la lista de usuarios:", e);
    }
  }, [users]);

  // Login: buscar en la lista `users`
  const login = useCallback((credentials) => {
    console.log("Intentando login con:", credentials.username);
    try {
      const usuarioEncontrado = users.find(
        (u) => u.username === credentials.username && u.password === credentials.password
      );

      if (usuarioEncontrado) {
        // crear objeto sin contraseña para el estado
        const { password, ...userWithoutPassword } = usuarioEncontrado;
        setUser(userWithoutPassword);
        localStorage.setItem(LS_KEY, JSON.stringify(userWithoutPassword));
        console.log("Login exitoso:", userWithoutPassword.username);
        return { success: true };
      } else {
        console.log("Credenciales incorrectas");
        setUser(null);
        localStorage.removeItem(LS_KEY);
        return { success: false, message: "Credenciales inválidas" };
      }
    } catch (error) {
      console.error("Error inesperado en login:", error);
      setUser(null);
      localStorage.removeItem(LS_KEY);
      return { success: false, message: "Error durante el proceso de login" };
    }
  }, [users]);

  // logout
  const logout = useCallback(() => {
    console.log("Cerrando sesión");
    setUser(null);
    localStorage.removeItem(LS_KEY);
  }, []);

  // agrega nuevo usuario a `users`
  const register = useCallback(({ username, password, name = "", rol = "ALUMNO" }) => {
    try {
      if (!username || !password) {
        return { success: false, message: "Faltan campos obligatorios." };
      }
      const exists = users.some(u => u.username === username);
      if (exists) {
        return { success: false, message: "El nombre de usuario ya existe." };
      }
      const newUser = {
        id: Date.now().toString(),
        username,
        password,
        name,
        rol,
      };
      const newUsers = [...users, newUser];
      setUsers(newUsers);
      // se guarda automáticamente por el useEffect
      return { success: true, user: { ...newUser, password: undefined } };
    } catch (err) {
      console.error("Error al registrar usuario:", err);
      return { success: false, message: "Error al registrar." };
    }
  }, [users]);

  // sincronizaniacion con user en localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem(LS_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(LS_KEY);
    }
  }, [user]);

  const valueContext = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      login,
      logout,
      register,
    }),
    [user, login, logout, register]
  );

  return (
    <AutorizacionContext.Provider value={valueContext}>
      {children}
    </AutorizacionContext.Provider>
  );
}