import { useState } from "react";
import axios from "axios";

export default function SubirCancion() {
  const [file, setFile] = useState(null);
  const [fingerprint, setFingerprint] = useState(null);
  const [duration, setDuration] = useState(null);
  const [loading, setLoading] = useState(false);

  // Maneja la selección del archivo
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setFingerprint(null);
    setDuration(null);
  };

  // Función para subir y analizar el audio
  const handleAnalizar = async () => {
    if (!file) return alert("Selecciona un archivo primero");

    try {
      setLoading(true);

      // 1️⃣ Subir archivo al backend
      const formData = new FormData();
      formData.append("file", file);
      await axios.post("http://localhost:5000/upload", formData);

      // 2️⃣ Generar fingerprint
      const fpResp = await axios.post("http://localhost:5000/api/fingerprint", {
        filename: file.name
      });

      setFingerprint(fpResp.data.fingerprint);
      setDuration(fpResp.data.duration);

    } catch (err) {
      console.error(err);
      alert("Error procesando el archivo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Subir y Analizar Canción</h2>

      <input type="file" accept="audio/*" onChange={handleFileChange} />
      <button onClick={handleAnalizar} disabled={loading || !file} style={{ marginLeft: "10px" }}>
        {loading ? "Procesando..." : "Analizar"}
      </button>

      {fingerprint && (
        <div style={{ marginTop: "20px" }}>
          <p><strong>Duración:</strong> {duration}s</p>
          <p><strong>Fingerprint:</strong> {fingerprint.substring(0, 100)}...</p>
        </div>
      )}
    </div>
  );
}

