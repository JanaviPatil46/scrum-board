// Board.js
import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import List from './List';
import ListData from './ListData';

const Board = () => {
  const [lists, setLists] = useState(ListData);

  const moveCard = (sourceListId, destinationListId, cardIndex) => {
    const sourceListIndex = lists.findIndex(list => list.id === sourceListId);
    const destinationListIndex = lists.findIndex(list => list.id === destinationListId);

    const updatedLists = [...lists];
    const [removed] = updatedLists[sourceListIndex].cards.splice(cardIndex, 1);
    updatedLists[destinationListIndex].cards.push(removed);

    setLists(updatedLists);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="board">
        {lists.map(list => (
          <List
            key={list.id}
            id={list.id}
            title={list.title}
            cards={list.cards}
            moveCard={moveCard}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default Board;