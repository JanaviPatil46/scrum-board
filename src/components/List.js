// List.js
import React from 'react';
import { useDrop } from 'react-dnd';
import Card from './Card';

const List = ({ id, title, cards, moveCard }) => {
  const [, drop] = useDrop({
    accept: 'CARD',
    drop(item, monitor) {
      const { cardIndex, sourceListId } = monitor.getItem();
      moveCard(sourceListId, id, cardIndex);
    },
  });

  return (
    <div className="list" ref={drop}>
      <h2>{title}</h2>
      <div className='custom-scroll' style={{ paddingTop:'20px',height:'90%',overflowY:'auto'}}>
      {cards.map((card, index) => (
        <Card key={index} index={index} content={card} id={id} />
      ))}
      </div>
      
    </div>
  );
};

export default List;