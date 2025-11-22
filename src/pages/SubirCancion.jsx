import { useState } from "react";
import "./SubirCancion.css";

export default function SubirCancion() {
  const [showModal, setShowModal] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setShowModal(true);
  }

  return (
    <div className="upload-container">
      <h1 className="upload-title">Subir Canción</h1>
      <p className="upload-subtitle">
        Sube tu canción para registrarla en la blockchain.
      </p>

      <form className="upload-form" onSubmit={handleSubmit}>
        {/* Título */}
        <div className="input-group">
          <label>Título de la canción</label>
          <input type="text" placeholder="Ej: Mi Melodía" required />
        </div>

        {/* Artista */}
        <div className="input-group">
          <label>Artista</label>
          <input type="text" placeholder="Ej: Sebastián Salazar" required />
        </div>

        {/* Área de arrastrar archivo */}
        <div className="dropzone">
          <p>Arrastra un archivo aquí o haz clic para seleccionar</p>
          <input type="file" accept=".mp3,.wav" required />
        </div>

        <button className="upload-btn">Subir Canción</button>
      </form>

      {/* MODAL */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <h2>¡Canción subida con éxito!</h2>
            <p>Tu canción ha sido registrada correctamente.</p>

            <button className="close-btn" onClick={() => setShowModal(false)}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
