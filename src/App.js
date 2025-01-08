import React from 'react';
import GameMap from './components/GameMap';
import NPCInteraction from './components/NPCInteraction';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Echo Chronicles</h1>
      <GameMap />
      <NPCInteraction />
    </div>
  );
};

export default App;
