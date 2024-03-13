//  import React from 'react'

// const Board = () => {

//   return (
    
//     <div >
//       <div className="flex-container" style={{ display: 'flex', width: '100%', height: '', border: '2px solid red', }}>
//         <div style={{ background: '#f1f1f1', margin: '10px', padding: '20px', fontSize: '20px', width: '400px' , }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
//             <p>Board one</p>
//             <span>0</span>
           
//           </div>
          
//         </div>
//         <div style={{ background: '#f1f1f1', margin: '10px', padding: '20px', fontSize: '20px', width: '400px' }}><div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
//           <p>Board two</p>
//           <span>0</span>
//         </div>
//         </div>
        



//       </div>
//     </div>
//   )
// }

// export default Board


// import React from 'react';

// const Card = ({ text }) => {
//   return (
//     <div style={{ background: '#ffffff', margin: '10px', padding: '10px', fontSize: '16px', width: '80%', border: '1px solid #cccccc' }}>
//       {text}
//     </div>
//   );
// };

// const Board = () => {
//   return (
//     <div>
//       <div className="flex-container" style={{ display: 'flex', width: '100%', height: '', border: '2px solid red' }}>
//         <div style={{ background: '#f1f1f1', margin: '10px', padding: '20px', fontSize: '20px', width: '400px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
//             <p>Board one</p>
//             <span>0</span>
//           </div>
//           <Card text="Card 1" />
//           <Card text="Card 2" />
//           {/* Add more cards as needed */}
//         </div>
//         <div style={{ background: '#f1f1f1', margin: '10px', padding: '20px', fontSize: '20px', width: '400px' }}>
//           <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
//             <p>Board two</p>
//             <span>0</span>
//           </div>
//           <Card text="Card A" />
//           <Card text="Card B" />
//           {/* Add more cards as needed */}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Board;




import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';


const ItemTypes = {
  CARD: 'card',
};
const Card = ({ id, text, index, moveCard }) => {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);

      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.CARD,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));

  return (
    <div ref={ref} style={{ opacity }}>
      {text}
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState([{ id: 1, text: 'Card 1' }, { id: 2, text: 'Card 2' },{ id: 3, text: 'Card 3' },{ id: 4, text: 'Card 4' },]);
  const [cards2, setCards2] = useState([]);

  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = cards[dragIndex];
    setCards(cards.filter((_, index) => index !== dragIndex));
    setCards2((prevCards2) => {
      const newCards2 = [...prevCards2];
      newCards2.splice(hoverIndex, 0, dragCard);
      return newCards2;
    });
  };

  return (
    <div>
      <div className="flex-container" style={{ display: 'flex', width: '100%', height: '', border: '2px solid red' }}>
        <div style={{ background: '#f1f1f1', margin: '10px', padding: '20px', fontSize: '20px', width: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
            <p>Board one</p>
            <span>{cards.length}</span>
          </div>
          {cards.map((card, index) => (
            <Card key={card.id} id={card.id} text={card.text} index={index} moveCard={moveCard} />
          ))}
        </div>
        <div style={{ background: '#f1f1f1', margin: '10px', padding: '20px', fontSize: '20px', width: '400px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '50px' }}>
            <p>Board two</p>
            <span>{cards2.length}</span>
          </div>
          {cards2.map((card, index) => (
            <div key={card.id} index={index}>{card.text}</div>
            
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default Board;
