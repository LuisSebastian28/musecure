import { getSongs } from "../utils/storage";
import "./MisCanciones.css";

export default function MisCanciones() {
  const canciones = getSongs();

  return (
    <div className="my-songs-container">
      <h1 className="page-title">Mis Canciones</h1>

      <div className="songs-grid">
        {canciones.map((song, i) => (
          <div key={i} className="song-card">
            <h3 className="song-title">{song.titulo}</h3>
            <p className="song-artist">Artista: {song.artista}</p>

            <p className="fingerprint">
              <strong>Fingerprint:</strong> {song.fingerprint}
            </p>

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
