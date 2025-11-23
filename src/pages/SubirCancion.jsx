import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { generateFingerprint } from "../utils/fingerprintAudio";
import { saveSong } from "../utils/storage";
import "./SubirCancion.css";

export default function SubirCancion() {
  const navigate = useNavigate();

  const [archivo, setArchivo] = useState(null);
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    if (!archivo) return alert("Selecciona una canción.");

    // 🚀 Generar fingerprint real
    const fingerprint = await generateFingerprint(archivo);

    // Guardar TODO
    saveSong({
      titulo,
      artista,
      fingerprint,
      estado: "Pendiente",
      fecha: new Date().toISOString(),
    });

    // Redirigir a "Mis Canciones"
    navigate("/canciones");
  }

  return (
    <div className="upload-container">
      <h1 className="upload-title">Subir Canción</h1>

      <form className="upload-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Título</label>
          <input
            type="text"
            required
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Artista</label>
          <input
            type="text"
            required
            value={artista}
            onChange={(e) => setArtista(e.target.value)}
          />
        </div>

        <div className="dropzone">
          <p>Selecciona un archivo de audio</p>
          <input
            type="file"
            accept=".mp3,.wav"
            required
            onChange={(e) => setArchivo(e.target.files[0])}
          />
        </div>

        <button className="upload-btn">Subir Canción</button>
      </form>
    </div>
  );
}
