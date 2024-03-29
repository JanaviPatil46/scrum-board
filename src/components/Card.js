// Card.js
import React from 'react';
import { useDrag } from 'react-dnd';

const Card = ({ index, card, id }) => {
    const { title, name, dates, content } = card;
  const [{ isDragging }, drag] = useDrag({
    type: 'CARD',
    item: { cardIndex: index, sourceListId: id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div className="card" ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {/* <p>{content}</p> */}
      <h3>{title}</h3>
      <p>Name: {name}</p>
      <p>Dates: {dates}</p>
      <p>{content}</p>
    
    </div>
  );
};

export default Card;