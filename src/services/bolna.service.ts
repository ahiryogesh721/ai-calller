import axios from 'axios';

export async function askBolna(context: any, userInput: string) {
  const res = await axios.post(
    'https://api.bolna.ai/v1/chat',
    {
      agent_id: process.env.BOLNA_AGENT_ID,
      context,
      message: userInput
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.BOLNA_API_KEY}`
      }
    }
  );

  return res.data;
}
