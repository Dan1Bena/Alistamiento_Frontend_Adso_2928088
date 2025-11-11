import { useState, useEffect } from "react";
import { Layout } from "../components/layout/Layout";
import "./Pagina.css";
import { leerUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } from "../services/usuarioService";

export const UsuariosPagina = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [usuarioActual, setUsuarioActual] = useState(null);

  const [formUsuario, setFormUsuario] = useState({
    cedula: "",
    nombre: "",
    email: "",
  });

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const data = await leerUsuarios();
      setUsuarios(data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };

  const abrirModal = (usuario = null) => {
    if (usuario) {
      setModoEdicion(true);
      setUsuarioActual(usuario);
      setFormUsuario({
        cedula: usuario.cedula,
        nombre: usuario.nombre,
        email: usuario.email,
      });
    } else {
      setModoEdicion(false);
      setUsuarioActual(null);
      setFormUsuario({ cedula: "", nombre: "", email: "" });
    }
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setModoEdicion(false);
    setUsuarioActual(null);
    setFormUsuario({ cedula: "", nombre: "", email: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modoEdicion && usuarioActual) {
        await actualizarUsuario(usuarioActual.id_instructor, formUsuario);
      } else {
        await crearUsuario(formUsuario);
      }
      await cargarUsuarios();
      cerrarModal();
    } catch (error) {
      console.error("Error al guardar usuario:", error);
    }
  };

  const handleEliminar = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este instructor?")) {
      try {
        await eliminarUsuario(id);
        await cargarUsuarios();
      } catch (error) {
        console.error("Error al eliminar usuario:", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUsuario({ ...formUsuario, [name]: value });
  };

  return (
    <Layout>
      <div className="usuarios-container">
        <div className="menu-secciones">
          <span className="activo">Instructores</span>
          <span>Programas</span>
          <span>Fichas</span>
        </div>

        <div className="usuarios-header">
          <h2 className="titulo-seccion">Gestión de Instructores</h2>
          <p className="subtitulo">
            Administra instructores, gestores y administradores del sistema.
          </p>
        </div>

        <button className="btn-crear" onClick={() => abrirModal()}>
          Crear Instructor
        </button>

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
                    ✏️
                  </button>
                  <button
                    className="btn-eliminar"
                    onClick={() => handleEliminar(u.id_instructor)}
                    title="Eliminar instructor"
                  >
                    🗑️
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
      </div>
    </Layout>
  );
};
