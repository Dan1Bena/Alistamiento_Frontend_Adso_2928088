import { useState, useEffect } from "react";
import { ModalUsuario } from "../components/ui/ModalUsuario";
import { leerUsuarios, eliminarUsuario, actualizarUsuario, crearUsuario } from "../services/usuarioService";
import { Layout } from "../components/layout/Layout";
import "./Pagina.css";

export const UsuariosPagina = () => {
  const [seccionActiva, setSeccionActiva] = useState("instructores");
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalPrograma, setMostrarModalPrograma] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [formUsuario, setFormUsuario] = useState({
    cedula: "",
    nombre: "",
    email: "",
    contrasena: "",
    estado: 1,      // ← opcional, si tu backend lo usa
  });
  const [programas, setProgramas] = useState([]);

  // Cargar instructores
  useEffect(() => {
    const cargarUsuarios = async () => {
      const data = await leerUsuarios();
      setUsuarios(data);
    };
    cargarUsuarios();
  }, []);

  const abrirModal = (usuario = null) => {
    setModoEdicion(!!usuario);
    setFormUsuario(usuario || { cedula: "", nombre: "", email: "" });
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

  const handleEliminar = async (id) => {
    await eliminarUsuario(id);
    const data = await leerUsuarios();
    setUsuarios(data);
  };

  // 🔹 FUNCIONES PARA PROGRAMAS
  const handleGuardarPrograma = (nuevoPrograma) => {
    setProgramas([...programas, nuevoPrograma]);
    setMostrarModalPrograma(false);
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

        {/* 🔹 SECCIÓN PROGRAMAS */}
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
                  <div key={p.id} className="usuario-card">
                    <div className="usuario-info">
                      <h4>{p.nombre}</h4>
                      <p><strong>Código:</strong> {p.codigo}</p>
                      <p><strong>Fichas Asociadas:</strong> {p.fichasAsociadas}</p>
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

              <button className="btn-crear">
                <i className="fas fa-folder-plus"></i> Crear Ficha
              </button>
            </div>

            <div className="fichas-lista">
              <p>No hay fichas registradas.</p>
            </div>

          </div>
        )}
      </div>
    </Layout>
  );
};
