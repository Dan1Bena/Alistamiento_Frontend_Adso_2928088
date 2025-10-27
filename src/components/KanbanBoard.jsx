import "./Kanban.css";
import KanbanColumn from "./KanbanColumn";
import { FASES, fichas } from "../data/mockData";


// const KanbanBoard = ({ fases, raps, instructores, onScheduleClick, onMoveRAP }) => {
//   return (
//     <div className="kanban-board">
//       {fases.map((fase) => (
//         <KanbanColumn
//           key={fase}
//           fase={fase}
//           raps={raps.filter((r) => r.fase === fase)}
//           instructores={instructores}
//           onScheduleClick={onScheduleClick}
//           onMoveRAP={onMoveRAP}
//         />
//       ))}
//     </div>
//   );
// };
export const KanbanBoard = () => {
  return (
    <div>
      <h1>Tablero Kanban</h1>
      <p>Fases cargadas: {FASES.length}</p>
      <p>Fichas cargadas: {fichas.length}</p>
    </div>
  );
};


export default KanbanBoard;
