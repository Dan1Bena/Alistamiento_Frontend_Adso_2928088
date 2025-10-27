import React from "react";
import fichas from "../data/mockData";
import "./Bienvenido.css";

const FichasAsignadas = () => {
  return (
    <div className="bienvenido-container">
      <h2>Mis Fichas Asignadas</h2>
      <p>Selecciona una ficha para acceder a la Sábana y gestionar los RAPs</p>

      <div className="fichas-grid">
        {fichas.map((ficha) => (
          <div key={ficha.id} className="ficha-card">
            <h3>{ficha.id}</h3>
            <p className="codigo">{ficha.codigo}</p>

            <div className="programa">
              <p className="titulo">PROGRAMA DE FORMACIÓN</p>
              <p className="nombre">{ficha.programa}</p>
              <p className="codigo-programa">Código: {ficha.codigoPrograma}</p>
            </div>

            <p>👨‍🏫 {ficha.instructor}</p>
            <p>🗓 Inicio: {ficha.inicio}</p>

            <span className="estado">{ficha.estado}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FichasAsignadas;
