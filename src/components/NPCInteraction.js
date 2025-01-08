import React, { useState } from 'react';
import { getNPCResponse } from '../services/api';

const NPCInteraction = () => {
  const [npcMessage, setNpcMessage] = useState('Hello, traveler!');
  const [inputValue, setInputValue] = useState('');

  const handleInteraction = async () => {
    const response = await getNPCResponse(inputValue);
    setNpcMessage(response.message);
    setInputValue('');
  };

  return (
    <div>
      <h3>NPC Interaction</h3>
      <div className="npc-message">{npcMessage}</div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Say something..."
      />
      <button onClick={handleInteraction}>Send</button>
    </div>
  );
};

export default NPCInteraction;
