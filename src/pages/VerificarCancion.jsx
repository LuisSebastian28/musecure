import { useState } from "react";
import "./VerificarCancion.css";

export default function VerificarCancion() {
  const [showModal, setShowModal] = useState(false);
  const [resultado, setResultado] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    // Simulación simple: alterna entre "existe" o "autentica"
    const random = Math.random() > 0.5;

    if (random) {
      setResultado({
        tipo: "existe",
        mensaje: "Esta canción ya existe y pertence a: Carlos Rivas",
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

      <form className="verify-form" onSubmit={handleSubmit}>
        <div className="dropzone">
          <p>Arrastra una canción aquí o selecciona un archivo</p>
          <input type="file" accept=".mp3,.wav" required />
        </div>

        <button className="verify-btn">Verificar</button>
      </form>

      {/* MODAL DE RESULTADO */}
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
