import { useState, useEffect } from "react";
import { ModalUsuario } from "../components/ui/ModalUsuario";
import {
  leerUsuarios,
  actualizarUsuario,
  crearUsuario,
} from "../services/usuarioService";
import { leerRoles } from "../services/rolService";
import "./Pagina.css";

export const UsuariosPagina = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [roles, setRoles] = useState([]);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    fetchUsuarios();
    fetchRoles();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const data = await leerUsuarios();
      setUsuarios(data);
    } catch (error) {
    }
  };

  const fetchRoles = async () => {
    try {
      const data = await leerRoles();
      setRoles(data);
    } catch (error) {
    }
  };

  const handleSaveUsuario = async (usuarioData) => {
    try {
      if (usuarioSeleccionado) {
        await actualizarUsuario(usuarioSeleccionado.id_usuario, usuarioData);
      } else {
        await crearUsuario(usuarioData);
      }
      await fetchUsuarios();
      setOpenModal(false);
      setUsuarioSeleccionado(null);
    } catch (error) {
    }
  };

  const handleEstado = async (usuario) => {
    try {
      const nuevoEstado = usuario.estado === "Activo" ? "Inactivo" : "Activo";
      await actualizarUsuario(usuario.id_usuario, {
        ...usuario,
        estado: nuevoEstado,
      });
      await fetchUsuarios();
    } catch (error) {
    }
  };

  return (
    <div className="pagina-contenedor">
      {/* Encabezado */}
      <div className="pagina-header">
        <h2 className="pagina-titulo">Gestión de Usuarios</h2>
        <p className="pagina-subtitulo">
          Administrar instructores, gestores y administradores del sistema
        </p>
      </div>

      {/* Botón Crear */}
      <div className="pagina-boton-contenedor">
        <button
          className="pagina-boton"
          onClick={() => {
            setUsuarioSeleccionado(null);
            setOpenModal(true);
          }}
        >
          + Crear Usuario
        </button>
      </div>

      {/* Lista */}
      <div className="lista-usuarios">
        <h3 className="lista-titulo">
          Lista de Usuarios{" "}
          <span className="lista-subtexto">
            {usuarios.length} usuarios registrados en el sistema
          </span>
        </h3>

        {usuarios.length > 0 ? (
          <div className="usuarios-contenedor">
            {usuarios.map((u) => {
              const iniciales = u.nombre
                ?.split(" ")
                .slice(0, 2)
                .map((n) => n[0]?.toUpperCase())
                .join("");

              return (
                <div key={u.id_usuario} className="usuario-card">
                  <div className="usuario-info-contenedor">
                    <div className="usuario-iniciales">{iniciales}</div>
                    <div className="usuario-info">
                      <p className="usuario-nombre">{u.nombre}</p>
                      <p className="usuario-email">{u.email}</p>
                    </div>
                  </div>

                  <div className="usuario-detalles">
                    <span className="usuario-rol">{u.rol}</span>
                    <span
                      className={`usuario-estado ${
                        u.estado === "Activo" ? "activo" : "inactivo"
                      }`}
                    >
                      {u.estado}
                    </span>

                    <div className="usuario-acciones">
                      <button
                        className="boton-editar"
                        onClick={() => {
                          setUsuarioSeleccionado(u);
                          setOpenModal(true);
                        }}
                      >
                        Editar
                      </button>

                      <button
                        className={`boton-estado ${
                          u.estado === "Activo"
                            ? "boton-inhabilitar"
                            : "boton-activar"
                        }`}
                        onClick={() => handleEstado(u)}
                      >
                        {u.estado === "Activo" ? "Inhabilitar" : "Activar"}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="tabla-vacia">No hay usuarios registrados</p>
        )}
      </div>

      {/* Modal */}
      {openModal && (
        <ModalUsuario
          onClose={() => {
            setOpenModal(false);
            setUsuarioSeleccionado(null);
          }}
          onSave={handleSaveUsuario}
          usuarioSeleccionado={usuarioSeleccionado}
          roles={roles}
        />
      )}
    </div>
  );
};
