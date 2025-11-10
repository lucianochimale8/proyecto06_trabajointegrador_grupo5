import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ProtectorRutas from "./components/ProtectorRutas";
import Navbar from "./common/Navbar";
import Header from "./common/Header";
import Login from "./common/Login";
import ColoresTexto from "./pages/DiagnosticoIngles/Ejercicio1/ColoresTexto";
import Animals from "./pages/DiagnosticoIngles/Ejercicio2/Animals";
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
import AboutMiembros from "./pages/AboutMiembros";
import Home from "./pages/Home";
import Error from "./common/Error";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectorRutas>
              <Home />
            </ProtectorRutas>
          }
        />
        <Route
          path="/DiagnosticoIngles/Ejercicio1"
          element={
            <ProtectorRutas>
              <ColoresTexto />
            </ProtectorRutas>
          }
        />
        <Route
          path="/DiagnosticoIngles/Ejercicio2"
          element={
            <ProtectorRutas>
              <Animals />
            </ProtectorRutas>
          }
        />
        <Route
          path="/proyecto2/CalculadorDePromedio"
          element={
            <ProtectorRutas>
              <CalculadorDePromedio />
            </ProtectorRutas>
          }
        />
        <Route
          path="/proyecto2/FormularioUNJU"
          element={
            <ProtectorRutas>
              <FormUNJU />
            </ProtectorRutas>
          }
        />
        <Route
          path="/proyecto2/NumeroMayor"
          element={
            <ProtectorRutas>
              <NumeroMayor />
            </ProtectorRutas>
          }
        />
        <Route
          path="/proyecto2/SimuladorDeSalario"
          element={
            <ProtectorRutas>
              <SimuladorDeSalario />
            </ProtectorRutas>
          }
        />
        <Route
          path="/proyecto2/SumaLaterales"
          element={
            <ProtectorRutas>
              <SumaLaterales />
            </ProtectorRutas>
          }
        />
        <Route
          path="/proyecto3/RegistroMascotas"
          element={
            <ProtectorRutas>
              <RegistroMascotas />
            </ProtectorRutas>
          }
        />
        <Route
          path="/proyecto3/ValorX"
          element={
            <ProtectorRutas>
              <ValorX />
            </ProtectorRutas>
          }
        />
        <Route
          path="/proyecto4/AdivinaElNumero"
          element={
            <ProtectorRutas>
              <AdivinaElNumero />
            </ProtectorRutas>
          }
        />
        <Route
          path="/proyecto4/JuegoDeColores"
          element={
            <ProtectorRutas>
              <JuegoDeColores />
            </ProtectorRutas>
          }
        />
        <Route
          path="/proyecto5/FormularioDeRegistro"
          element={
            <ProtectorRutas>
              <Formulario />
            </ProtectorRutas>
          }
        />
        <Route
          path="/proyecto5/JuegoEstrellas"
          element={
            <ProtectorRutas>
              <JuegoEstrellas />
            </ProtectorRutas>
          }
        />
        <Route
          path="/AboutMiembros"
          element={
            <ProtectorRutas>
              <AboutMiembros />
            </ProtectorRutas>
          }
        />
        <Route path="/*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;