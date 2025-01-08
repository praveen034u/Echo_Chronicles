import React, { useState } from 'react';
import { sendToLex, convertToSpeech } from '../services/api';

const NPCInteraction = () => {
  const [userInput, setUserInput] = useState('');
  const [npcResponse, setNpcResponse] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);

  const handleInteraction = async () => {
    const lexResponse = await sendToLex(userInput);
    setNpcResponse(lexResponse);

    const speechUrl = await convertToSpeech(lexResponse);
    if (speechUrl) {
      setAudioUrl(speechUrl);
    }

    setUserInput('');
  };

  const playAudio = () => {
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audio.play();
    }
  };

  return (
    <div>
      <h3>NPC Interaction</h3>
      <div className="npc-message">
        {npcResponse && (
          <p>
            {npcResponse}{' '}
            {audioUrl && <button onClick={playAudio}>🔊</button>}
          </p>
        )}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Say something..."
      />
      <button onClick={handleInteraction}>Send</button>
    </div>
  );
};

export default NPCInteraction;
