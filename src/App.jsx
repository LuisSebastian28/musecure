import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import SubirCancion from "./pages/SubirCancion";
import "./App.css";
import MisCanciones from "./pages/MisCanciones";
import Verificar from "./pages/VerificarCancion";
import SidebarLayout from "./layout/SidebarLayout";

export default function App() {
  return (
    <Routes>
      {/* SIN SIDEBAR */}
      <Route path="/" element={<Login />} />

      {/* CON SIDEBAR */}
      <Route element={<SidebarLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/subir" element={<SubirCancion />} />
        <Route path="/canciones" element={<MisCanciones />} />
        <Route path="/verificar" element={<Verificar />} />
      </Route>
    </Routes>
  );
}
