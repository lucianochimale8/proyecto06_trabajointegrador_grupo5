import { useContext } from 'react';
import { AutorizacionContext } from '../context/AutorizadorContext';

// Hook personalizado
export const useAutorizacion = () => {
  const context = useContext(AutorizacionContext);
  if (!context) {
    throw new Error('useAutorizacion debe ser usado dentro de un AuthProvider');
  }
  return context;
};