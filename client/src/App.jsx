import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./common/Navbar";
import Login from "./common/Login";
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
import Error from "./common/Error";

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/proyecto2/CalculadorDePromedio" element={<CalculadorDePromedio />} />
        <Route path="/proyecto2/FormularioUNJU" element={<FormUNJU />} />
        <Route path="/proyecto2/NumeroMayor" element={<NumeroMayor />} />
        <Route path="/proyecto2/SimuladorDeSalario" element={<SimuladorDeSalario />} />
        <Route path="/proyecto2/SumaLaterales" element={<SumaLaterales />} />
        <Route path="/proyecto3/RegistroMascotas" element={<RegistroMascotas />} />
        <Route path="/proyecto3/ValorX" element={<ValorX />} />
        <Route path="/proyecto4/AdivinaElNumero" element={<AdivinaElNumero />} />
        <Route path="/proyecto4/JuegoDeColores" element={<JuegoDeColores />} />
        <Route path="/proyecto5/FormularioDeRegistro" element={<Formulario />} />
        <Route path="/proyecto5/JuegoEstrellas" element={<JuegoEstrellas />} />
        <Route path="/AboutMiembros" element={<AboutMiembros />} />
        <Route path="/*" element={<Error/>}/>
      </Routes>
    </Router>
  );
}

export default App;