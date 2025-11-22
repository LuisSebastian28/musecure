import { Link, Outlet, useNavigate } from "react-router-dom";
import "./Sidebar.css";

export default function SidebarLayout() {
  const navigate = useNavigate();

  function handleLogout() {
    navigate("/");
  }

  return (
    <div className="layout-container">
      <aside className="sidebar">

        <div className="sidebar-content">
          <h2 className="sidebar-title">MuSecure</h2>

          <nav className="sidebar-nav">
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/subir">Subir Canción</Link>
            <Link to="/canciones">Mis Canciones</Link>
            <Link to="/verificar">Verificar Canción</Link>
          </nav>
        </div>

        <button className="logout-btn" onClick={handleLogout}>
          Cerrar sesión
        </button>

      </aside>

      <main className="content">
        <Outlet />
      </main>
    </div>
  );
}
