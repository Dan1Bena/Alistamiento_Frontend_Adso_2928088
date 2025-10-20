import RAPCard from "./RAPCard";
import { useDrop } from "react-dnd";

const FASE_COLORS = {
  'Planeación': '#E3F2FD',
  'Ejecución': '#E8F5E9',
  'Evaluación': '#FFF3E0',
  'Finalizado': '#F3E5F5'
};

const KanbanColumn = ({ fase, raps, instructores, onScheduleClick, onMoveRAP }) => {
const [{ isOver }, drop] = useDrop({
  accept: "RAP",
  drop: (item) => {
    onMoveRAP(item.id, fase);
    return undefined;
  },
  collect: (monitor) => ({
    isOver: !!monitor.isOver(),
  }),
});

  return (
    <div
      ref={drop}
      className={`kanban-column ${isOver ? "column-over" : ""}`}
      style={{ backgroundColor: FASE_COLORS[fase] || "#fff" }}
    >
      <h3>{fase}</h3>
      <p className="rap-count">{raps.length} RAP{raps.length !== 1 ? 's' : ''}</p>
      <div className="rap-list">
        {raps.map((rap) => {
          const instructor = instructores.find((i) => i.id === rap.instructor_id);
          return (
            <RAPCard
              key={rap.id}
              rap={rap}
              instructor={instructor}
              onScheduleClick={() => onScheduleClick(rap)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default KanbanColumn;
