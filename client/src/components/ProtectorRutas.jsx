import { useAutorizacion } from "../hooks/useAutorizacion";
import { Navigate } from "react-router-dom";

export const ProtectorRutas = ({ children }) => {
    const { isAuthenticated } = useAutorizacion();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectorRutas;