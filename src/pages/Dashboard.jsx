import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <p className="dashboard-subtitle">
        Resumen general de tu actividad en MuSecure
      </p>

      {/* Tarjetas de estadísticas */}
      <div className="stats-grid">
        <div className="stat-card">
          <h2>12</h2>
          <p>Canciones Subidas</p>
        </div>

        <div className="stat-card">
          <h2>10</h2>
          <p>Verificadas</p>
        </div>

        <div className="stat-card">
          <h2>2</h2>
          <p>Pendientes de Verificación</p>
        </div>
      </div>

      {/* Últimas actividades simuladas */}
      <div className="activity-section">
        <h2>Últimas Actividades</h2>

        <ul className="activity-list">
          <li>✔ Canción "Luz Interna" verificada correctamente.</li>
          <li>⬆ Subiste una nueva canción: "Ritmo Urbano".</li>
          <li>⚠ La canción "Amor en Silencio" ya existe en blockchain.</li>
        </ul>
      </div>
    </div>
  );
}
