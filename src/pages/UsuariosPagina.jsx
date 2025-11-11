import { useState, useEffect } from "react";
console.log("✅ Renderizando UsuariosPagina nueva");
import { Layout } from "../components/layout/Layout";
import "./Pagina.css";

// 🔹 Importa los servicios del backend
import { leerUsuarios, crearUsuario } from "../services/usuarioService";

export const UsuariosPagina = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoUsuario, setNuevoUsuario] = useState({
    cedula: "",
    nombre: "",
    correo: "",
  });

  // 🔹 Leer usuarios al cargar
  useEffect(() => {
    const cargarUsuarios = async () => {
      try {
        const data = await leerUsuarios();
        setUsuarios(data);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      }
    };
    cargarUsuarios();
  }, []);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => {
    setMostrarModal(false);
    setNuevoUsuario({ cedula: "", nombre: "", correo: "" });
  };

  // 🔹 Guardar nuevo usuario en la BD
  const handleCrearUsuario = async (e) => {
    e.preventDefault();
    try {
      const usuarioCreado = await crearUsuario(nuevoUsuario);
      setUsuarios([...usuarios, usuarioCreado]); // se muestra sin recargar
      cerrarModal();
    } catch (error) {
      console.error("Error al crear usuario:", error);
    }
  };

  // 🔹 Actualizar los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoUsuario({ ...nuevoUsuario, [name]: value });
  };

  return (
    <Layout>
      <div className="usuarios-container">

        {/* 🔹 Menú superior (Usuarios, Programas, Fichas) */}
        <div className="menu-secciones">
          <span className="activo">Instructores</span>
          <span>Programas</span>
          <span>Fichas</span>
        </div>

        {/* 🔹 Encabezado de la sección */}
        <div className="usuarios-header">
          <h2 className="titulo-seccion">Gestión de Instructores</h2>
          <p className="subtitulo">
            Administra instructores, gestores y administradores del sistema.
          </p>
        </div>

        {/* 🔹 Contenedor central */}
        {usuarios.length === 0 ? (
          <div className="usuarios-lista-vacia">
            <p>No hay usuarios registrados en el sistema.</p>
            <button className="btn-crear" onClick={abrirModal}>
              Crear Instructor
            </button>
          </div>
        ) : (
          <div className="usuarios-lista">
            {usuarios.map((u) => (
              <div key={u.id_usuario} className="card-usuario">
                <h4>{u.nombre}</h4>
                <p>{u.correo}</p>
                <p><strong>Cédula:</strong> {u.cedula}</p>
              </div>
            ))}
            <button className="btn-crear" onClick={abrirModal}>
              Crear Instructor
            </button>
          </div>
        )}

        {/* 🔹 Modal */}
        {mostrarModal && (
          <div className="modal-overlay" onClick={cerrarModal}>
            <div
              className="modal-contenido animate-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h3>Crear Nuevo Usuario</h3>
              <p className="descripcion-modal">
                Completa los siguientes campos obligatorios para crear un nuevo usuario.
              </p>

              <form className="form-modal" onSubmit={handleCrearUsuario}>
                <label>Cédula*</label>
                <input
                  type="text"
                  name="cedula"
                  placeholder="Número de cédula"
                  value={nuevoUsuario.cedula}
                  onChange={handleChange}
                  required
                />

                <label>Nombre Completo del Instructor*</label>
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  value={nuevoUsuario.nombre}
                  onChange={handleChange}
                  required
                />

                <label>Correo Electrónico del Instructor*</label>
                <input
                  type="email"
                  name="correo"
                  placeholder="correo@sena.edu.co"
                  value={nuevoUsuario.correo}
                  onChange={handleChange}
                  required
                />

                <div className="acciones-modal">
                  <button
                    type="button"
                    className="btn-cancelar"
                    onClick={cerrarModal}
                  >
                    Cancelar
                  </button>
                  <button type="submit" className="btn-crear-usuario">
                    Crear Usuario
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
