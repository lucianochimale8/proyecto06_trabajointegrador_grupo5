import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./common/Navbar";
import Header from "./common/Header";
import Login from "./common/Login";
import Colours from "./pages/DiagnosticoIngles/Ejercicio1/Colours";
import ColoresTexto from "./pages/DiagnosticoIngles/Ejercicio1/ColoresTexto";
import Animals from "./pages/DiagnosticoIngles/Ejercicio2/Animals";
import NumbersDays from "./pages/DiagnosticoIngles/Ejercicio3/NumbersDays";
import CalculadorDePromedio from "./pages/Proyecto2/CalculadorDePromedio/AverageCalculator";
import FormUNJU from "./pages/Proyecto2/FormularioUNJU/FormUNJU";
import NumeroMayor from "./pages/Proyecto2/NumeroMayor/MaxNumber";
import SimuladorDeSalario from "./pages/Proyecto2/SimuladorDeSalario/SalarySimulator";
import SumaLaterales from "./pages/Proyecto2/SumaLaterales/ReplaceQuestionMarks";
import RegistroMascotas from "./pages/Proyecto3/RegistroMascotas/PetRegistry";
import ValorX from "./pages/Proyecto3/ValorX/CasillasActivity";
import AdivinaElNumero from "./pages/Proyecto4/AdivinaElNumero/GuessTheNumber";
import JuegoDeColores from "./pages/Proyecto4/JuegoDeColores/GameOfColours";
import Formulario from "./pages/Proyecto5/FormularioDeRegistro/Formulario";
import JuegoEstrellas from "./pages/Proyecto5/JuegoEstrellas/Estrellas";
import AboutMiembros from "./common/AboutMiembros";
import Home from "./common/Home";
import Error from "./common/Error";
import ProtectedRoute from "./components/ProtectedRoute";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          {/* Todas las demás rutas requieren autenticación */}
          <Route 
            path="/DiagnosticoIngles/Ejercicio1" 
            element={
              <ProtectedRoute>
                <ColoresTexto />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/DiagnosticoIngles/Ejercicio2" 
            element={
              <ProtectedRoute>
                <Animals />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/DiagnosticoIngles/Ejercicio3" 
            element={
              <ProtectedRoute>
                <NumbersDays />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/proyecto2/CalculadorDePromedio" 
            element={
              <ProtectedRoute>
                <CalculadorDePromedio />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/proyecto2/FormularioUNJU" 
            element={
              <ProtectedRoute>
                <FormUNJU />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/proyecto2/NumeroMayor" 
            element={
              <ProtectedRoute>
                <NumeroMayor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/proyecto2/SimuladorDeSalario" 
            element={
              <ProtectedRoute>
                <SimuladorDeSalario />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/proyecto2/SumaLaterales" 
            element={
              <ProtectedRoute>
                <SumaLaterales />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/proyecto3/RegistroMascotas" 
            element={
              <ProtectedRoute>
                <RegistroMascotas />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/proyecto3/ValorX" 
            element={
              <ProtectedRoute>
                <ValorX />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/proyecto4/AdivinaElNumero" 
            element={
              <ProtectedRoute>
                <AdivinaElNumero />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/proyecto4/JuegoDeColores" 
            element={
              <ProtectedRoute>
                <JuegoDeColores />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/proyecto5/FormularioDeRegistro" 
            element={
              <ProtectedRoute>
                <Formulario />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/proyecto5/JuegoEstrellas" 
            element={
              <ProtectedRoute>
                <JuegoEstrellas />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/AboutMiembros" 
            element={
              <ProtectedRoute>
                <AboutMiembros />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/Home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
                <Error/>
              </ProtectedRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;