import "./Kanban.css";
import KanbanColumn from "./KanbanColumn";

const KanbanBoard = ({ fases, raps, instructores, onScheduleClick, onMoveRAP }) => {
  return (
    <div className="kanban-board">
      {fases.map((fase) => (
        <KanbanColumn
          key={fase}
          fase={fase}
          raps={raps.filter((r) => r.fase === fase)}
          instructores={instructores}
          onScheduleClick={onScheduleClick}
          onMoveRAP={onMoveRAP}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
