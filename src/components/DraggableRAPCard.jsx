import { useDrag } from 'react-dnd';
import RAPCard from './RAPCard';

const DraggableRAPCard = ({ rap, instructor, onScheduleClick }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'RAP',
    item: rap,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag}>
      <RAPCard
        rap={rap}
        instructor={instructor}
        onScheduleClick={onScheduleClick}
        isDragging={isDragging}
      />
    </div>
  );
};

export default DraggableRAPCard;
