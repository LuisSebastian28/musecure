import { Link, Outlet, useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import "./Sidebar.css";

export default function SidebarLayout() {
  const navigate = useNavigate();
  const { logout } = usePrivy();

  async function handleLogout() {
    await logout();   // <--- ESTE ES EL LOGOUT REAL DE PRIVY
    navigate("/", { replace: true });
  }

  return (
    <div className="layout-container">

      <aside className="sidebar">

        <div className="profile-box" onClick={() => navigate("/perfil")}>
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Perfil"
            className="profile-img"
          />
          <div className="profile-info">
            <h3>Sebastián</h3>
            <span>Artista</span>
          </div>
        </div>

        <h2 className="sidebar-title">MuSecure</h2>

        <nav className="sidebar-nav">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/subir">Subir Canción</Link>
          <Link to="/canciones">Mis Canciones</Link>
          <Link to="/verificar">Verificar Canción</Link>
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          ⏻ Cerrar sesión
        </button>

      </aside>

      <main className="content">
        <Outlet />
      </main>

    </div>
  );
}
