import { useState, useEffect } from "react";
import "./ModalFicha.css";

export const ModalFicha = ({ onClose, onSave, fichaSeleccionada, programas }) => {
  const [codigoFicha, setCodigoFicha] = useState("");
  const [idPrograma, setIdPrograma] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [jornada, setJornada] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");
  const [cantidadTrimestre, setCantidadTrimestre] = useState("");
  const [gestor, setGestor] = useState("");
  const [instructores, setInstructores] = useState("");

  useEffect(() => {
    if (fichaSeleccionada) {
      setCodigoFicha(fichaSeleccionada.codigo_ficha || "");
      setIdPrograma(fichaSeleccionada.id_programa || "");
      setModalidad(fichaSeleccionada.modalidad || "");
      setJornada(fichaSeleccionada.jornada || "");
      setAmbiente(fichaSeleccionada.ambiente || "");
      setFechaInicio(fichaSeleccionada.fecha_inicio || "");
      setFechaFinal(fichaSeleccionada.fecha_final || "");
      setCantidadTrimestre(fichaSeleccionada.cantidad_trimestre || "");
      setGestor(fichaSeleccionada.gestor || "");
      setInstructores(fichaSeleccionada.instructores || "");
    } else {
      setCodigoFicha("");
      setIdPrograma("");
      setModalidad("");
      setJornada("");
      setAmbiente("");
      setFechaInicio("");
      setFechaFinal("");
      setCantidadTrimestre("");
      setGestor("");
      setInstructores("");
    }
  }, [fichaSeleccionada]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...fichaSeleccionada,
      codigo_ficha: codigoFicha,
      id_programa: idPrograma,
      modalidad,
      jornada,
      ambiente,
      fecha_inicio: fechaInicio,
      fecha_final: fechaFinal,
      cantidad_trimestre: cantidadTrimestre,
      gestor,
      instructores,
    };
    onSave(data);
  };

  return (
    <div className="modal-fondo">
      <div className="modal-contenedor">
        <div className="modal-header">
          <h2 className="modal-titulo">
            {fichaSeleccionada ? "Editar Ficha" : "Crear Nueva Ficha"}
          </h2>
          <p className="modal-subtitulo">
            Completa la información de la ficha de formación.
          </p>
        </div>

        <form className="modal-formulario" onSubmit={handleSubmit}>
          {/* GRID DE DOS COLUMNAS */}
          <div className="modal-grid">
            <div className="modal-seccion">
              <label className="modal-label">Código de la Ficha*</label>
              <input
                className="modal-input"
                value={codigoFicha}
                onChange={(e) => setCodigoFicha(e.target.value)}
                placeholder="Ej: 2669742"
                required
              />
            </div>

            <div className="modal-seccion">
              <label className="modal-label">Código del Programa*</label>
              <select
                className="modal-input"
                value={idPrograma}
                onChange={(e) => setIdPrograma(e.target.value)}
                required
              >
                <option value="">Seleccionar programa</option>
                {programas.map((p) => (
                  <option key={p.id_programa} value={p.id_programa}>
                    {p.nombre_programa}
                  </option>
                ))}
              </select>
            </div>

            <div className="modal-seccion">
              <label className="modal-label">Modalidad*</label>
              <select
                className="modal-input"
                value={modalidad}
                onChange={(e) => setModalidad(e.target.value)}
                required
              >
                <option value="">Seleccionar modalidad</option>
                <option value="Presencial">Presencial</option>
                <option value="Virtual">Virtual</option>
              </select>
            </div>

            <div className="modal-seccion">
              <label className="modal-label">Jornada*</label>
              <select
                className="modal-input"
                value={jornada}
                onChange={(e) => setJornada(e.target.value)}
                required
              >
                <option value="">Seleccionar jornada</option>
                <option value="Mañana">Mañana</option>
                <option value="Tarde">Tarde</option>
                <option value="Noche">Noche</option>
              </select>
            </div>

            <div className="modal-seccion">
              <label className="modal-label">Ubicación (Ambiente)*</label>
              <input
                className="modal-input"
                value={ambiente}
                onChange={(e) => setAmbiente(e.target.value)}
                placeholder="Ej: Laboratorio 301"
                required
              />
            </div>

            <div className="modal-seccion">
              <label className="modal-label">Fecha de Inicio*</label>
              <input
                type="date"
                className="modal-input"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
                required
              />
            </div>

            <div className="modal-seccion">
              <label className="modal-label">Fecha de Finalización*</label>
              <input
                type="date"
                className="modal-input"
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-subseccion">
            <h4 className="modal-subtitulo2">Añadir Gestor</h4>
            <p className="modal-descripcion">
              Selecciona un instructor que será vinculado como Gestor de la ficha.
            </p>
            <select
              className="modal-input"
              value={gestor}
              onChange={(e) => setGestor(e.target.value)}
            >
              <option value="">Seleccionar instructor para gestor</option>
              <option value="Carlos Mendoza">Carlos Mendoza</option>
              <option value="Ana García">Ana García</option>
              <option value="María López">María López</option>
            </select>
          </div>

          <div className="modal-subseccion">
            <h4 className="modal-subtitulo2">Vincular Instructores</h4>
            <p className="modal-descripcion">
              Añade instructores adicionales vinculados a la ficha.
            </p>
            <input
              className="modal-input"
              placeholder="Escribe los correos de los instructores"
              value={instructores}
              onChange={(e) => setInstructores(e.target.value)}
            />
          </div>

          <div className="modal-acciones">
            <button
              type="button"
              className="modal-boton-cancelar"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="modal-boton-guardar">
              {fichaSeleccionada ? "Guardar Cambios" : "Crear Ficha"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
