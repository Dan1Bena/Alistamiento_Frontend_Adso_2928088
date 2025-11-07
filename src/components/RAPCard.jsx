import { useDrag } from "react-dnd";

const RAPCard = ({ rap, instructor, onScheduleClick }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "RAP",
    item: { id: rap.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      className={`rap-card ${isDragging ? "dragging" : ""}`}
    >
      <div className="rap-header">
        <span className="rap-code">{rap.codigo}</span>
      </div>
      <p className="rap-instructor">
        {instructor?.nombre || "Sin instructor asignado"}
      </p>
      <button className="rap-btn" onClick={onScheduleClick}>
        Ver horario
      </button>
    </div>
  );
};

export default RAPCard;
