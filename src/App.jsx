import { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import KanbanBoard from "./components/KanbanBoard";
import { FASES, raps as initialRaps, instructores } from "./data/mockData";

function App() {
  const [raps, setRaps] = useState(initialRaps);

  const handleMoveRAP = (rapId, newFase) => {
    setRaps((prev) =>
      prev.map((r) =>
        r.id === rapId ? { ...r, fase: newFase } : r
      )
    );
  };

  const handleScheduleClick = (rap) => {
    alert(`Ver horario del ${rap.codigo}`);
  };

  return (
    <div className="app-container">
      <h1>Tablero Kanban - RAPs</h1>
      <DndProvider backend={HTML5Backend}>
        <KanbanBoard
          fases={FASES}
          raps={raps}
          instructores={instructores}
          onScheduleClick={handleScheduleClick}
          onMoveRAP={handleMoveRAP}
        />
      </DndProvider>
    </div>
  );
}

export default App;
