import { useState, useEffect } from "react";
import { ModalPrograma } from "../components/ui/ModalPrograma";
import "./Pagina.css";
import { mockProgramas } from "../data/mockData";

export const ProgramasPagina = () => {
  const [programas, setProgramas] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    // Simulación de carga desde mockData
    setProgramas(mockProgramas);
  }, []);

  const handleAddPrograma = (nuevoPrograma) => {
    setProgramas((prev) => [...prev, nuevoPrograma]);
    setOpenModal(false);
  };

  const handleDeletePrograma = (id) => {
    setProgramas((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div className="pagina-contenedor">
      {/* Encabezado */}
      <div className="pagina-header">
        <h2 className="pagina-titulo">Gestión de Programas</h2>
        <p className="pagina-subtitulo">
          Administrar programas de formación y sus competencias
        </p>
      </div>

      {/* Botón Crear */}
      <div className="pagina-boton-contenedor">
        <button className="pagina-boton" onClick={() => setOpenModal(true)}>
          + Crear Programa
        </button>
      </div>

      {/* Lista de Programas */}
      <div className="lista-usuarios">
        <h3 className="lista-titulo">
          Lista de Programas{" "}
          <span className="lista-subtexto">
            {programas.length} programas de formación registrados
          </span>
        </h3>

        {programas.length > 0 ? (
          <div className="usuarios-contenedor">
            {programas.map((p) => (
              <div key={p.id} className="usuario-card">
                <div className="usuario-info-contenedor">
                  <div className="usuario-info">
                    <p className="usuario-nombre">{p.nombre}</p>
                    <p className="usuario-email">
                      Código: {p.codigo} <br />
                      {p.fichasAsociadas} fichas asociadas
                    </p>
                  </div>
                </div>
                <div className="usuario-detalles">
                  <div className="usuario-acciones">
                    <button
                      className="boton-inhabilitar"
                      onClick={() => handleDeletePrograma(p.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="tabla-vacia">No hay programas registrados</p>
        )}
      </div>

      {/* Modal Crear Programa */}
      {openModal && (
        <ModalPrograma onClose={() => setOpenModal(false)} onSave={handleAddPrograma} />
      )}
    </div>
  );
};
