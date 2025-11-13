import { useState } from "react";
import "./ModalPrograma.css";

export const ModalPrograma = ({ onClose, onSave }) => {
    const [proyectoFormativo, setProyectoFormativo] = useState(null);
    const [programaFormacion, setProgramaFormacion] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleProyectoChange = (e) => setProyectoFormativo(e.target.files[0]);
    const handleProgramaChange = (e) => setProgramaFormacion(e.target.files[0]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!proyectoFormativo || !programaFormacion) {
            alert("Por favor selecciona ambos archivos PDF.");
            return;
        }

        try {
            setLoading(true);

            // === 1️⃣ Enviar PROGRAMA DE FORMACIÓN ===
            const formPrograma = new FormData();
            formPrograma.append("archivo", programaFormacion);
            formPrograma.append("tipo", "todo");

            // ✅ CORREGIDO: Agrega /procesar antes de /programa
            const resPrograma = await fetch("http://localhost:3000/api/pdf/procesar/programa", {
                method: "POST",
                body: formPrograma,
            });

            if (!resPrograma.ok) {
                const errorText = await resPrograma.text();
                console.error("Error respuesta servidor:", errorText);
                throw new Error(`Error ${resPrograma.status}: ${resPrograma.statusText}`);
            }

            const dataPrograma = await resPrograma.json();
            console.log("✅ Programa procesado:", dataPrograma);

            // === 2️⃣ Enviar PROYECTO FORMATIVO ===
            const formProyecto = new FormData();
            formProyecto.append("archivo", proyectoFormativo);

            // ✅ CORREGIDO: Agrega /procesar antes de /proyecto
            const resProyecto = await fetch("http://localhost:3000/api/pdf/procesar/proyecto", {
                method: "POST",
                body: formProyecto,
            });

            if (!resProyecto.ok) {
                const errorText = await resProyecto.text();
                console.error("Error respuesta servidor:", errorText);
                throw new Error(`Error ${resProyecto.status}: ${resProyecto.statusText}`);
            }

            const dataProyecto = await resProyecto.json();
            console.log("✅ Proyecto procesado:", dataProyecto);

            // === 3️⃣ Si todo fue bien, avisar al padre y cerrar modal ===
            onSave({
                programa: dataPrograma.data || dataPrograma,
                proyecto: dataProyecto.data || dataProyecto,
            });

            alert("✅ Archivos procesados y guardados correctamente");
            onClose();

        } catch (error) {
            console.error("❌ Error al enviar los archivos:", error);
            alert(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Crear Nuevo Programa</h2>
                <p className="modal-subtitle">
                    Carga los archivos PDF requeridos para generar automáticamente la información del programa.
                </p>

                <form onSubmit={handleSubmit} className="modal-form">
                    {/* Proyecto Formativo */}
                    <div className="file-upload">
                        <label>Proyecto Formativo* (PDF)</label>
                        <div className="file-box">
                            <input
                                type="file"
                                accept="application/pdf"
                                id="proyectoFormativo"
                                onChange={handleProyectoChange}
                                hidden
                            />
                            <label htmlFor="proyectoFormativo" className="file-label">
                                {proyectoFormativo ? proyectoFormativo.name : "Seleccionar archivo PDF"}
                            </label>
                        </div>
                    </div>

                    {/* Programa de Formación */}
                    <div className="file-upload">
                        <label>Programa de Formación* (PDF)</label>
                        <div className="file-box">
                            <input
                                type="file"
                                accept="application/pdf"
                                id="programaFormacion"
                                onChange={handleProgramaChange}
                                hidden
                            />
                            <label htmlFor="programaFormacion" className="file-label">
                                {programaFormacion ? programaFormacion.name : "Seleccionar archivo PDF"}
                            </label>
                        </div>
                    </div>

                    {/* Botones */}
                    <div className="modal-actions">
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className="create-btn" disabled={loading}>
                            {loading ? "Procesando..." : "Crear Programa"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
