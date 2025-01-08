import axios from 'axios';

const API_BASE_URL = 'https://nee5ghu8w7.execute-api.us-east-1.amazonaws.com/dev/npc-interaction';

export const getNPCResponse = async (playerAction) => {
    try {
        const response = await axios.post(`https://nee5ghu8w7.execute-api.us-east-1.amazonaws.com/dev/npc-interaction`, {
            action: playerAction
        },
        {
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching NPC response:', error);
        return { message: 'An error occurred. Try again later.' };
    }
};