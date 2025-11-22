import "./MisCanciones.css";

export default function MisCanciones() {
  const canciones = [
    { id: 1, titulo: "Luz Interna", artista: "Sebastián", estado: "Verificada" },
    { id: 2, titulo: "Ritmo Urbano", artista: "Sebastián", estado: "Pendiente" },
    { id: 3, titulo: "Camino Estelar", artista: "Sebastián", estado: "Verificada" },
  ];

  return (
    <div className="my-songs-container">
      <h1 className="page-title">Mis Canciones</h1>
      <p className="page-subtitle">Lista de tus canciones subidas</p>

      <div className="songs-grid">
        {canciones.map((song) => (
          <div key={song.id} className="song-card">
            <h3 className="song-title">{song.titulo}</h3>
            <p className="song-artist">Artista: {song.artista}</p>

            <span
              className={
                song.estado === "Verificada"
                  ? "estado verificada"
                  : "estado pendiente"
              }
            >
              {song.estado}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
