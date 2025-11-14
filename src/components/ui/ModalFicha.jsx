import { useState, useEffect } from "react";
import "./ModalFicha.css";
import { ChevronDown, Plus } from "lucide-react";
import axios from "axios";

export const ModalFicha = ({ onClose, onSave }) => {
  // CAMPOS DEL FORMULARIO
  const [codigoFicha, setCodigoFicha] = useState("");
  const [codigoPrograma, setCodigoPrograma] = useState("");
  const [modalidad, setModalidad] = useState("");
  const [jornada, setJornada] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [fechaInicio, setFechaInicio] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [gestor, setGestor] = useState("");

  // DINÁMICOS
  const [programas, setProgramas] = useState([]);
  const [correosInstructoresDB, setCorreosInstructoresDB] = useState([]);

  // VINCULAR INSTRUCTORES
  const [instructorEmail, setInstructorEmail] = useState("");
  const [instructorEncontrado, setInstructorEncontrado] = useState(null);
  const [instructoresVinculados, setInstructoresVinculados] = useState([]);

  // 🔵 Cargar instructores y programas desde la BD
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const resInstructores = await axios.get("http://localhost:3000/api/instructores");
        const resProgramas = await axios.get("http://localhost:3000/api/programas");

        setCorreosInstructoresDB(resInstructores.data);
        setProgramas(resProgramas.data);

      } catch (error) {
        console.error("ERROR CARGANDO DATOS:", error);
      }
    };

    cargarDatos();
  }, []);

  // 🟦 Buscar instructor por correo
  const buscarInstructor = (correo) => {
    setInstructorEmail(correo);

    const encontrado = correosInstructoresDB.find(
      (inst) => inst.email?.toLowerCase() === correo.toLowerCase()
    );

    setInstructorEncontrado(encontrado || null);
  };

  // 🟩 Agregar instructor a la ficha
  const agregarInstructor = () => {
    if (!instructorEncontrado) return;

    if (!instructoresVinculados.some(i => i.id_instructor === instructorEncontrado.id_instructor)) {
      setInstructoresVinculados([...instructoresVinculados, instructorEncontrado]);
    }

    setInstructorEmail("");
    setInstructorEncontrado(null);
  };

  // 🟧 Guardar ficha
  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaFicha = {
      codigoFicha,
      codigoPrograma,
      modalidad,
      jornada,
      ubicacion,
      fechaInicio,
      fechaFin,
      gestor,
      instructores: instructoresVinculados.map(i => i.id_instructor)
    };

    onSave(nuevaFicha);
    onClose();
  };
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>

        <h3 className="modal-title">Crear Nueva Ficha</h3>
        <p className="modal-subtitle">Completa la información de la ficha de formación.</p>

        <form onSubmit={handleSubmit}>

          {/* Código ficha / programa */}
          <div className="grid-2">
            <div className="form-group">
              <label>Código de la Ficha*</label>
              <input
                type="text"
                placeholder="Ej: 2669742"
                value={codigoFicha}
                onChange={(e) => setCodigoFicha(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Programa*</label>
              <div className="select-box">
                <select value={codigoPrograma} onChange={(e) => setCodigoPrograma(e.target.value)}>
                  <option value="">Seleccionar programa</option>

                  {programas.map((p) => (
                    <option key={p.id_programa} value={p.id_programa}>
                      {p.nombre_programa}
                    </option>
                  ))}
                </select>
                <ChevronDown className="icon" size={18} />
              </div>
            </div>
          </div>

          {/* Modalidad / jornada */}
          <div className="grid-2">
            <div className="form-group">
              <label>Modalidad*</label>
              <div className="select-box">
                <select value={modalidad} onChange={(e) => setModalidad(e.target.value)}>
                  <option value="">Seleccionar modalidad</option>
                  <option value="Presencial">Presencial</option>
                  <option value="Virtual">Virtual</option>
                </select>
                <ChevronDown className="icon" size={18} />
              </div>
            </div>

            <div className="form-group">
              <label>Jornada*</label>
              <div className="select-box">
                <select value={jornada} onChange={(e) => setJornada(e.target.value)}>
                  <option value="">Seleccionar jornada</option>
                  <option value="Diurna">Diurna</option>
                  <option value="Nocturna">Nocturna</option>
                </select>
                <ChevronDown className="icon" size={18} />
              </div>
            </div>
          </div>

          {/* Ubicación / Fecha */}
          <div className="grid-2">
            <div className="form-group">
              <label>Ubicación*</label>
              <input
                type="text"
                placeholder="Ej: Laboratorio 301"
                value={ubicacion}
                onChange={(e) => setUbicacion(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Fecha de Inicio*</label>
              <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
            </div>
          </div>

          <div className="form-group">
            <label>Fecha de Finalización*</label>
            <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
          </div>

          {/* Vincular Instructores */}
          <h4 className="section-title">Vincular Instructores</h4>
          <p className="section-text">
            Escribe el correo del instructor registrado. Se agregará automáticamente cuando se valide.
          </p>

          <div className="add-instructor-box">
            <input
              type="email"
              placeholder="instructor@sena.edu.co"
              value={instructorEmail}
              onChange={(e) => buscarInstructor(e.target.value)}
            />

            <button
              type="button"
              className="add-btn"
              disabled={!instructorEncontrado}
              onClick={agregarInstructor}
            >
              <Plus size={18} />
              Añadir
            </button>
          </div>

          {instructorEncontrado && (
            <p style={{ fontSize: "13px", color: "#007bff" }}>
              Instructor encontrado: <strong>{instructorEncontrado.nombre}</strong>
            </p>
          )}

          {instructoresVinculados.length > 0 && (
            <ul className="instructor-list">
              {instructoresVinculados.map((inst) => (
                <li key={inst.id_instructor}>{inst.nombre} – {inst.email}</li>
              ))}
            </ul>
          )}

          {/* Botones */}
          <div className="modal-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>Cancelar</button>
            <button type="submit" className="create-btn">Crear Ficha</button>
          </div>
        </form>

      </div>
    </div>
  );
};
