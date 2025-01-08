import React, { useState } from 'react';
import './GameMap.css';

const GameMap = () => {
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  const gridSize = 5; // 5x5 grid

  // Function to move the player
  const handleTileClick = (x, y) => {
    setPlayerPosition({ x, y });
  };

  return (
    <div className="game-map">
      {[...Array(gridSize)].map((_, row) => (
        <div key={row} className="row">
          {[...Array(gridSize)].map((_, col) => (
            <div
              key={col}
              className={`tile ${
                playerPosition.x === row && playerPosition.y === col
                  ? 'player'
                  : ''
              }`}
              onClick={() => handleTileClick(row, col)}
            >
              {playerPosition.x === row && playerPosition.y === col ? 'P' : ''}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GameMap;
