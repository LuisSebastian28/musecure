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
          <hr />

          <nav className="sidebar-nav">
            <Link to="/bienvenida">Bienvenida</Link>
            <Link to="/bienvenida">Otra Página</Link>
            <Link to="/bienvenida">Más opciones</Link>
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
