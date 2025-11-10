import { useAutorizacion } from "../hooks/useAutorizacion";
import { Navigate } from "react-router-dom";

export const ProtectorRutas = ({ children }) => {
    const { isAuthenticated } = useAutorizacion();

    if (!isAuthenticated) {
        return <Navigate to="/Home" replace />;
    }

    return children;
};

export default ProtectorRutas;