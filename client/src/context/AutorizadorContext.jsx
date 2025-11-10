import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import usuarioGuardado from "../data/usuarios.json";

// Crear contexto
export const AutorizacionContext = createContext(null);
// Guardar en una variable el local storage key
const LS_KEY = "auth:user";

// Componente Proveedor del contexto de Autenticacion
export function AutorizacionProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      // Si existe algun usuario en sesion si no remover
      const usuarioAlmacenado = localStorage.getItem(LS_KEY);
      return usuarioAlmacenado ? JSON.parse(usuarioAlmacenado) : null;
    } catch {
      localStorage.removeItem(LS_KEY);
      return null;
    }
  });

  // Login simplificado - solo usa datos locales
  const login = useCallback((credentials) => {
    console.log("Intentando login con:", credentials.username);

    try {
      // Buscar directamente en los datos locales
      const usuarioEncontrado = usuarioGuardado.find(
        (u) =>
          u.username === credentials.username &&
          u.password === credentials.password
      );

      if (usuarioEncontrado) {
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
  }, []);

  const logout = useCallback(() => {
    console.log("Cerrando sesión");
    setUser(null);
    localStorage.removeItem(LS_KEY);
  }, []);

  // Sincronizar localStorage con estado
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
    }),
    [user, login, logout]
  );

  // Proveer el valor del contexto a los hijos
  return (
    <AutorizacionContext.Provider value={valueContext}>
      {children}
    </AutorizacionContext.Provider>
  );
}