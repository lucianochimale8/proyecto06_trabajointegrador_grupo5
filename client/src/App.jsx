import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./common/Navbar";
import Login from "./common/Login";
import Proyecto2 from "./components/Proyecto2/Proyecto2";
import Proyecto3 from "./components/Proyecto3/Proyecto3";
import AdivinaElNumero from "./components/Proyecto4/AdivinaElNumero/GuessTheNumber";
import JuegoDeColores from "./components/Proyecto4/JuegoDeColores/GameOfColours";
import Formulario from "./components/Proyecto5/FormularioDeRegistro/Formulario";
import JuegoEstrellas from "./components/Proyecto5/JuegoEstrellas/Estrellas";
import AboutMiembros from "./common/AboutMiembros";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/proyecto2" element={<Proyecto2 />} />
        <Route path="/proyecto3" element={<Proyecto3 />} />
        <Route path="/proyecto4/AdivinaElNumero" element={<AdivinaElNumero />} />
        <Route path="/proyecto4/JuegoDeColores" element={<JuegoDeColores />} />
        <Route path="/proyecto5/FormularioDeRegistro" element={<Formulario />} />
        <Route path="/proyecto5/JuegoEstrellas" element={<JuegoEstrellas />} />
        <Route path="/AboutMiembros" element={<AboutMiembros />} />
      </Routes>
    </Router>
  );
}

export default App;