import { useState, useEffect } from "react";
import { ModalUsuario } from "../components/ui/ModalUsuario";
import { ModalPrograma } from "../components/ui/ModalPrograma";
import { ModalFicha } from "../components/ui/ModalFicha";
import { leerUsuarios, eliminarUsuario, actualizarUsuario, crearUsuario } from "../services/usuarioService";
import { Layout } from "../components/layout/Layout";
import "./Pagina.css";

export const UsuariosPagina = () => {
  const [seccionActiva, setSeccionActiva] = useState("instructores");
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalPrograma, setMostrarModalPrograma] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarModalFicha, setMostrarModalFicha] = useState(false);
  const [modoEdicionFicha, setModoEdicionFicha] = useState(false);
  const [fichas, setFichas] = useState([]); // NUEVO ESTADO PARA FICHAS

  const [formUsuario, setFormUsuario] = useState({

    cedula: "",
    nombre: "",
    email: "",
    contrasena: "",
    estado: 1,      // ← opcional, si tu backend lo usa
  });
  const [programas, setProgramas] = useState([]);

  const abrirModalFicha = () => {
    setModoEdicionFicha(false);  // por si luego agregas edición
    setMostrarModalFicha(true);
  };

  const cerrarModalFicha = () => {
    setMostrarModalFicha(false);
  };


  // Cargar instructores
  useEffect(() => {
    const cargarUsuarios = async () => {
      const data = await leerUsuarios();
      setUsuarios(data);
    };
    cargarUsuarios();
  }, []);

  // 🔹 Cargar PROGRAMAS desde el backend
  useEffect(() => {
    const cargarProgramas = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/programas");
        if (!res.ok) throw new Error("Error al obtener los programas");
        const data = await res.json();
        setProgramas(data); // Asegúrate de que el backend devuelva un array JSON
      } catch (error) {
        console.error("Error cargando programas:", error);
      }
    };
    cargarProgramas();
  }, []);

  // 🔹 Cargar FICHAS desde el backend
  useEffect(() => {
    const cargarFichas = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/fichas/todas");
        if (!res.ok) throw new Error("Error al obtener las fichas");
        const data = await res.json();
        setFichas(data);
      } catch (error) {
        console.error("Error cargando fichas:", error);
      }
    };

    if (seccionActiva === "fichas") {
      cargarFichas();
    }
  }, [seccionActiva]);

  const abrirModal = (usuario = null) => {
    setModoEdicion(!!usuario);
    const valoresPorDefecto = {
    cedula: "",
    nombre: "", 
    email: "",
    contrasena: "",
    estado: 1
  };
    setFormUsuario(usuario ? { ...valoresPorDefecto, ...usuario } : valoresPorDefecto);
    setMostrarModal(true);
  };

  const cerrarModal = () => setMostrarModal(false);

  const handleChange = (e) => {
    setFormUsuario({ ...formUsuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modoEdicion) {
      await actualizarUsuario(formUsuario);
    } else {
      await crearUsuario(formUsuario);
    }
    const data = await leerUsuarios();
    setUsuarios(data);
    cerrarModal();
  };

  const handleEliminarPrograma = async (id) => {
    if (!confirm("¿Seguro que deseas eliminar este programa?")) return;

    try {
      console.log('🔍 ID a eliminar:', id); // Para verificar el ID

      if (!id) {
        alert('Error: ID del programa no válido');
        return;
      }

      const response = await fetch(`http://localhost:3000/api/programas/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.mensaje || 'Error al eliminar programa');
      }

      const result = await response.json();
      alert(result.mensaje);

      // Actualizar el estado - recargar desde el servidor para estar seguros
      const cargarProgramas = async () => {
        try {
          const res = await fetch("http://localhost:3000/api/programas");
          if (!res.ok) throw new Error("Error al obtener los programas");
          const data = await res.json();
          setProgramas(data);
        } catch (error) {
          console.error("Error recargando programas:", error);
        }
      };

      cargarProgramas();

    } catch (error) {
      console.error('Error al eliminar programa:', error);
      alert('Error al eliminar programa: ' + error.message);
    }
  };


  // 🔹 FUNCIONES PARA PROGRAMAS
  const handleGuardarPrograma = (nuevoPrograma) => {
    const programaData = {
      id_programa: nuevoPrograma.programa?.id_programa || Date.now(),
      nombre: nuevoPrograma.programa?.nombre_programa || "Sin nombre",
      codigo: nuevoPrograma.programa?.codigo_programa || "N/A",
      fichasAsociadas: nuevoPrograma.programa?.fichas?.length || 0,
    };

    setProgramas((prev) => [...prev, programaData]);
    setMostrarModalPrograma(false);
  };

  // Guardar ficha en BD y actualizar estado local
  const guardarFicha = async (ficha) => {
    try {
      // Adaptar los nombres de campos para que coincidan con tu base de datos
      const fichaData = {
        id_programa: ficha.codigoPrograma,
        codigo_ficha: ficha.codigoFicha,
        modalidad: ficha.modalidad,
        jornada: ficha.jornada,
        ambiente: ficha.ubicacion,
        fecha_inicio: ficha.fechaInicio,
        fecha_final: ficha.fechaFin,
        cantidad_trimestre: 3 // o el valor que corresponda
      };

      const res = await fetch("http://localhost:3000/api/fichas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(fichaData),
      });

      if (!res.ok) throw new Error("Error al guardar la ficha");

      const resultado = await res.json();
      console.log("Ficha guardada en BD:", resultado);

      // 🔄 Actualizar el estado local con la nueva ficha
      if (resultado.ficha) {
        setFichas(prevFichas => [...prevFichas, resultado.ficha]);
      }

      return resultado;

    } catch (error) {
      console.error("Error guardando ficha:", error);
      throw error;
    }
  };

  // 🔴 Eliminar ficha
  const handleEliminarFicha = async (idFicha) => {
    if (!confirm("¿Seguro que deseas eliminar esta ficha?")) return;

    try {
      const res = await fetch(`http://localhost:3000/api/fichas/${idFicha}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Error al eliminar la ficha");

      // 🔄 Actualizar estado local eliminando la ficha
      setFichas(prevFichas => prevFichas.filter(ficha => ficha.id_ficha !== idFicha));

      alert("Ficha eliminada correctamente");

    } catch (error) {
      console.error("Error eliminando ficha:", error);
      alert("Error al eliminar ficha: " + error.message);
    }
  };

  // 🔵 Obtener nombre del programa por ID
  const obtenerNombrePrograma = (idPrograma) => {
    const programa = programas.find(p => p.id_programa == idPrograma);
    return programa ? programa.nombre_programa : "Programa no encontrado";
  };


  return (
    <Layout>
      <div className="usuarios-container">
        {/* MENU DE SECCIONES CON ANIMACIÓN */}
        <div className="menu-secciones-animadas">
          <div
            className={`tab ${seccionActiva === "instructores" ? "activo" : ""}`}
            onClick={() => setSeccionActiva("instructores")}
          >
            <i className="fas fa-user"></i>
            <span>Usuarios</span>
          </div>
          <div
            className={`tab ${seccionActiva === "programas" ? "activo" : ""}`}
            onClick={() => setSeccionActiva("programas")}
          >
            <i className="fas fa-graduation-cap"></i>
            <span>Programas</span>
          </div>
          <div
            className={`tab ${seccionActiva === "fichas" ? "activo" : ""}`}
            onClick={() => setSeccionActiva("fichas")}
          >
            <i className="fas fa-file-alt"></i>
            <span>Fichas</span>
          </div>
        </div>


        {/* 🔹 SECCIÓN INSTRUCTORES */}
        {seccionActiva === "instructores" && (
          <>
            <div className="usuarios-header">
              <div>
                <h2 className="titulo-seccion">Gestión de Instructores</h2>
                <p className="subtitulo">
                  Administra instructores, gestores y administradores del sistema.
                </p>
              </div>

              <button className="btn-crear" onClick={() => abrirModal()}>
                <i className="fas fa-user-plus"></i> Crear Instructor
              </button>
            </div>


            <div className="usuarios-lista">
              {usuarios.length === 0 ? (
                <p>No hay usuarios registrados en el sistema.</p>
              ) : (
                usuarios.map((u) => (
                  <div key={u.id_instructor} className="usuario-card">
                    <div className="usuario-info">
                      <h4>{u.nombre}</h4>
                      <p><strong>Correo:</strong> {u.email}</p>
                    </div>
                    <div className="acciones-card">
                      <button
                        className="btn-editar"
                        onClick={() => abrirModal(u)}
                        title="Editar instructor"
                      >
                        <i className="fas fa-pen"></i>
                      </button>
                      <button
                        className="btn-eliminar"
                        onClick={() => handleEliminar(u.id_instructor)}
                        title="Eliminar instructor"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>

            {mostrarModal && (
              <div className="modal-overlay" onClick={cerrarModal}>
                <div
                  className="modal-contenido animate-modal"
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3>{modoEdicion ? "Editar Instructor" : "Crear Nuevo Instructor"}</h3>
                  <p className="descripcion-modal">
                    {modoEdicion
                      ? "Modifica los datos del instructor seleccionado."
                      : "Completa los siguientes campos para registrar un nuevo instructor."}
                  </p>

                  <form className="form-modal" onSubmit={handleSubmit}>
                    <label>Cédula*</label>
                    <input
                      type="text"
                      name="cedula"
                      placeholder="Número de cédula"
                      value={formUsuario.cedula}
                      onChange={handleChange}
                      required
                    />

                    <label>Nombre Completo*</label>
                    <input
                      type="text"
                      name="nombre"
                      placeholder="Nombre completo"
                      value={formUsuario.nombre}
                      onChange={handleChange}
                      required
                    />

                    <label>Correo Electrónico*</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="correo@sena.edu.co"
                      value={formUsuario.email}
                      onChange={handleChange}
                      required
                    />

                    <label>Contraseña*</label>
                    <input
                      type="password"
                      name="contrasena"
                      placeholder="••••••••••"
                      value={formUsuario.contrasena}
                      onChange={handleChange}
                      required
                    />

                    <div className="acciones-modal">
                      <button type="button" className="btn-cancelar" onClick={cerrarModal}>
                        Cancelar
                      </button>
                      <button type="submit" className="btn-crear-usuario">
                        {modoEdicion ? "Guardar Cambios" : "Crear Instructor"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </>
        )}
        { /* SECCIÓN PROGRAMAS - CORREGIDO */}
        {seccionActiva === "programas" && (
          <>
            <div className="usuarios-header">
              <div>
                <h2 className="titulo-seccion">Gestión de Programas</h2>
                <p className="subtitulo">
                  Administra los programas de formación del sistema.
                </p>
              </div>

              <button
                className="btn-crear"
                onClick={() => setMostrarModalPrograma(true)}
              >
                <i className="fas fa-book-open"></i> Crear Programa
              </button>
            </div>

            <div className="usuarios-lista">
              {programas.length === 0 ? (
                <p>No hay programas registrados.</p>
              ) : (
                programas.map((p) => (
       <div key={p.id_programa} className="usuario-card">

                    <div className="usuario-info">
                      <h4>{p.nombre_programa}</h4> {/* ✅ Usar nombre_programa */}
                      <p><strong>Código:</strong> {p.codigo_programa}</p> {/* ✅ Usar codigo_programa */}
                      <p><strong>Fichas Asociadas:</strong> {p.total_fichas}</p> {/* ✅ Usar total_fichas */}
                    </div>

                    <div className="acciones-card">
                      <button
                        className="btn-eliminar"
                        onClick={() => handleEliminarPrograma(p.id_programa)}
                        title="Eliminar programa"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {mostrarModalPrograma && (
              <ModalPrograma
                onClose={() => setMostrarModalPrograma(false)}
                onSave={handleGuardarPrograma}
              />
            )}
          </>
        )}

        {seccionActiva === "fichas" && (
          <div className="fichas-seccion">
            <div className="usuarios-header">
              <div>
                <h2 className="titulo-seccion">Gestión de Fichas</h2>
                <p className="subtitulo">
                  Administra las fichas activas de los programas de formación.
                </p>
              </div>

              <button className="btn-crear" onClick={abrirModalFicha}>
                <i className="fas fa-folder-plus"></i> Crear Ficha
              </button>
            </div>

            <div className="usuarios-lista">
              {fichas.length === 0 ? (
                <p>No hay fichas registradas.</p>
              ) : (
                fichas.map((ficha) => (
                  <div key={ficha.id_ficha} className="usuario-card">
                    <div className="usuario-info">
                      <h4>Ficha #{ficha.codigo_ficha}</h4>
                      <p><strong>Programa:</strong> {ficha.nombre_programa || obtenerNombrePrograma(ficha.id_programa)}</p>
                      <p><strong>Modalidad:</strong> {ficha.modalidad}</p>
                      <p><strong>Jornada:</strong> {ficha.jornada}</p>
                      <p><strong>Ubicación:</strong> {ficha.ubicacion}</p>
                      <p><strong>Fecha Inicio:</strong> {new Date(ficha.fecha_inicio).toLocaleDateString()}</p>
                      <p><strong>Fecha Fin:</strong> {new Date(ficha.fecha_fin).toLocaleDateString()}</p>
                    </div>

                    <div className="acciones-card">
                      <button
                        className="btn-eliminar"
                        onClick={() => handleEliminarFicha(ficha.id_ficha)}
                        title="Eliminar ficha"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {mostrarModalFicha && (
              <ModalFicha
                onClose={cerrarModalFicha}
                onSave={async (nuevaFicha) => {
                  try {
                    await guardarFicha(nuevaFicha);
                    cerrarModalFicha();
                  } catch (error) {
                    console.error("Error al guardar ficha:", error);
                  }
                }}
              />
            )}
          </div>
        )}

      </div>
    </Layout>
  );
};

// Jace
