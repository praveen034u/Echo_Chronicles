import axios from 'axios';
import AWS from 'aws-sdk';

const polly = new AWS.Polly();
const lexRuntime = new AWS.LexRuntimeV2();

AWS.config.update({
    region: 'us-east-1', // Replace with your region
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: 'us-east-1:15fa9560-9dc4-4580-beac-c9930152a36c', // Replace with your Identity Pool ID
    }),
  });

const API_BASE_URL = 'https://nee5ghu8w7.execute-api.us-east-1.amazonaws.com/dev/npc-interaction';

export const sendToLex = async (text) => {
    const params = {
      botId: 'GTLTKZLDRA', // Replace with your bot ID
      botAliasId: 'TSTALIASID', // Replace with your bot alias ID
      localeId: 'en_US',
      sessionId: Date.now().toString(), // Replace with unique session ID per user
      text: text,
    };

    try {
        const response = await lexRuntime.recognizeText(params).promise();
        return response.messages[0].content;
      } catch (error) {
        console.error('Error interacting with Lex:', error);
        return 'I had trouble understanding that.';
      }
    };

 

export const convertToSpeech = async (text) => {
  const params = {
    Text: text,
    OutputFormat: 'mp3',
    VoiceId: 'Ivy', // Choose your desired voice
  };

  try {
    const response = await polly.synthesizeSpeech(params).promise();
    const audioUrl = URL.createObjectURL(new Blob([response.AudioStream]));
    return audioUrl;
  } catch (error) {
    console.error('Error converting text to speech:', error);
    return null;
  }
};

export const getNPCResponse = async (playerAction) => {
    try {
        const response = await axios.post(API_BASE_URL, {
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