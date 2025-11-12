import { useState } from "react";
import { ModalPrograma } from "../components/ui/ModalPrograma"; // ruta ajusta según tu estructura
import { Layout } from "../components/layout/Layout";
import "./ModalPrograma.css"; // si tienes estilos específicos

export const ProgramasPagina = () => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [programas, setProgramas] = useState([]);

  const handleGuardarPrograma = (nuevoPrograma) => {
    setProgramas([...programas, nuevoPrograma]);
    setModalAbierto(false);
  };

  return (
    <Layout>
      <div className="contenedor-programas">
        <div className="encabezado-programas">
          <h1 className="titulo-programas">Programas</h1>
          <button
            className="btn-crear-programa"
            onClick={() => setModalAbierto(true)}
          >
            Crear Programa
          </button>
        </div>

        {/* Cards o tabla de programas */}
        <div className="lista-programas">
          {programas.length === 0 ? (
            <p className="sin-programas">No hay programas registrados.</p>
          ) : (
            programas.map((p) => (
              <div key={p.id} className="card-programa">
                <h3>{p.nombre}</h3>
                <p><strong>Código:</strong> {p.codigo}</p>
                <p><strong>Fichas Asociadas:</strong> {p.fichasAsociadas}</p>
              </div>
            ))
          )}
        </div>

        {modalAbierto && (
          <ModalPrograma
            onClose={() => setModalAbierto(false)}
            onSave={handleGuardarPrograma}
          />
        )}
      </div>
    </Layout>
  );
};
