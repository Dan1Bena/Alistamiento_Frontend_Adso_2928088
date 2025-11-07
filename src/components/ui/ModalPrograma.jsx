import { useState } from "react";
import "./ModalPrograma.css";

export const ModalPrograma = ({ onClose, onSave }) => {
  const [proyectoFormativo, setProyectoFormativo] = useState(null);
  const [programaFormacion, setProgramaFormacion] = useState(null);

  const handleFileChange = (e, tipo) => {
    const file = e.target.files[0];
    if (tipo === "proyecto") setProyectoFormativo(file);
    if (tipo === "programa") setProgramaFormacion(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!proyectoFormativo || !programaFormacion) return alert("Por favor carga ambos archivos PDF.");

    // Mock del nuevo programa
    const nuevoPrograma = {
      id: Date.now(),
      nombre: programaFormacion.name.replace(".pdf", ""),
      codigo: `COD-${Math.floor(Math.random() * 1000)}`,
      fichasAsociadas: Math.floor(Math.random() * 5) + 1,
    };

    onSave(nuevoPrograma);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-programa">
        <div className="modal-header">
          <h3>Crear Nuevo Programa</h3>
          <p>Carga los archivos PDF requeridos para generar automáticamente la información del programa.</p>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <div className="file-section">
            <label>Proyecto Formativo* (PDF)</label>
            <div className="file-drop">
              <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, "proyecto")} />
              {proyectoFormativo ? (
                <div className="file-info">
                  <span>{proyectoFormativo.name}</span>
                </div>
              ) : (
                <p>Arrastra tu archivo aquí o haz click para seleccionar</p>
              )}
            </div>
          </div>

          <div className="file-section">
            <label>Programa de Formación* (PDF)</label>
            <div className="file-drop">
              <input type="file" accept="application/pdf" onChange={(e) => handleFileChange(e, "programa")} />
              {programaFormacion ? (
                <div className="file-info">
                  <span>{programaFormacion.name}</span>
                </div>
              ) : (
                <p>Arrastra tu archivo aquí o haz click para seleccionar</p>
              )}
            </div>
          </div>

          <div className="modal-buttons">
            <button type="button" className="btn-cancelar" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-guardar">
              Crear Programa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
