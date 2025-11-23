import { useState } from "react";
import { generateFingerprint } from "../utils/fingerprintAudio";
import { findSongByFingerprint } from "../utils/storage";
import "./VerificarCancion.css";

export default function VerificarCancion() {
  const [archivo, setArchivo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [procesando, setProcesando] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!archivo) return alert("Sube un archivo.");

    setProcesando(true);
    
    try {
      const fingerprint = await generateFingerprint(archivo);

      // Convertir fingerprint a formato legible para mostrar
      const fingerprintDisplay = fingerprint
        .slice(0, 10) // Mostrar solo los primeros 10 hashes
        .map(item => item.hash)
        .join('\n');

      const match = findSongByFingerprint(fingerprint);

      if (match) {
        setResultado({
          tipo: "existe",
          mensaje: `Ya está registrada y pertenece a: ${match.artista}`,
          fingerprint: fingerprintDisplay,
          totalHashes: fingerprint.length
        });
      } else {
        setResultado({
          tipo: "autentica",
          mensaje: "No existe ninguna coincidencia en la base de datos.",
          fingerprint: fingerprintDisplay,
          totalHashes: fingerprint.length
        });
      }

      setShowModal(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Error al procesar el archivo');
    } finally {
      setProcesando(false);
    }
  }

  return (
    <div className="verify-container">
      <h1 className="verify-title">Verificar Canción</h1>

      <form className="verify-form" onSubmit={handleSubmit}>
        <div className="dropzone">
          <input
            type="file"
            accept=".mp3,.wav"
            required
            onChange={(e) => setArchivo(e.target.files[0])}
            disabled={procesando}
          />
        </div>

        <button className="verify-btn" disabled={procesando}>
          {procesando ? "Procesando..." : "Verificar"}
        </button>
      </form>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>
              {resultado?.tipo === "autentica"
                ? "✔ Canción Auténtica"
                : "⚠ Ya Registrada"}
            </h2>

            <p>{resultado?.mensaje}</p>

            <div className="fingerprint-box">
              <strong>Fingerprint (primeros 10 hashes de {resultado?.totalHashes}):</strong>
              <pre>{resultado?.fingerprint}</pre>
            </div>

            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}