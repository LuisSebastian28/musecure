import { Link, Outlet, useNavigate } from "react-router-dom";
import { usePrivy } from "@privy-io/react-auth";
import "./Sidebar.css";

export default function SidebarLayout() {
  const navigate = useNavigate();
  const { logout, user } = usePrivy();

  async function handleLogout() {
    await logout();
    navigate("/", { replace: true });
  }

  // Obtener dirección de la wallet
  const walletAddress = user?.wallet?.address;

  // Reducir formato a 0xabc...1234
  const shortAddress = walletAddress
    ? walletAddress.slice(0, 6) + "..." + walletAddress.slice(-4)
    : "Cargando...";

  return (
    <div className="layout-container">

      <aside className="sidebar">

        <div className="profile-box">
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Perfil"
            className="profile-img"
          />
          <div className="profile-info">
            <h3>{shortAddress}</h3>
            <span>Wallet</span>
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
