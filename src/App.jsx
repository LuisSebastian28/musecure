import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Bienvenida from "./pages/Welcome";
import SidebarLayout from "./layout/SidebarLayout";
import "./App.css";


export default function App() {
  return (
    <Routes>
      {/* SIN SIDEBAR */}
      <Route path="/" element={<Login />} />

      {/* CON SIDEBAR */}
      <Route element={<SidebarLayout />}>
        <Route path="/bienvenida" element={<Bienvenida />} />
      </Route>
    </Routes>
  );
}
