import { useState } from "react";
import "./VerificarCancion.css";

export default function VerificarCancion() {
  const [showModal, setShowModal] = useState(false);
  const [resultado, setResultado] = useState(null);

  const verificadas = [
    "Luz Interna",
    "Caminos",
    "Estrella Roja",
  ];

  const noVerificadas = [
    "Ritmo Urbano",
    "Sueños Rotos",
  ];

  function handleSubmit(e) {
    e.preventDefault();

    const random = Math.random() > 0.5;

    if (random) {
      setResultado({
        tipo: "existe",
        mensaje: "Esta canción ya existe y pertenece a: Carlos Rivas",
      });
    } else {
      setResultado({
        tipo: "autentica",
        mensaje: "¡Canción auténtica! No existe en blockchain.",
      });
    }

    setShowModal(true);
  }

  return (
    <div className="verify-container">
      <h1 className="verify-title">Verificar Canción</h1>
      <p className="verify-subtitle">
        Comprueba si una canción ya está registrada en la blockchain.
      </p>

      {/* LISTAS SUPERIORES */}
      <div className="lists-grid">
        <div className="list-box">
          <h3 className="list-title success">✔ Verificadas</h3>
          <ul>
            {verificadas.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="list-box">
          <h3 className="list-title error">⚠ No verificadas</h3>
          <ul>
            {noVerificadas.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* FORM ABAJO */}
      <form className="verify-form" onSubmit={handleSubmit}>
        <div className="dropzone">
          <p>Arrastra una canción aquí o selecciona un archivo</p>
          <input type="file" accept=".mp3,.wav" required />
        </div>

        <button className="verify-btn">Verificar</button>
      </form>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            {resultado?.tipo === "autentica" && (
              <h2 className="success-title">✔ Canción Auténtica</h2>
            )}

            {resultado?.tipo === "existe" && (
              <h2 className="error-title">⚠ Ya Registrada</h2>
            )}

            <p className="modal-message">{resultado?.mensaje}</p>

            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
