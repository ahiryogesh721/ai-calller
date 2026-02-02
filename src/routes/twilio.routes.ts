import { Router } from 'express';
import  VoiceResponse  from 'twilio/lib/twiml/VoiceResponse';
import { handleUserSpeech } from '../services/call.service';

export const twilioRouter = Router();

twilioRouter.post('/voice', async (req, res) => {
  const userSpeech = req.body.SpeechResult || '';
  const callSid = req.body.CallSid;

  const reply = await handleUserSpeech(callSid, userSpeech);

  const twiml = new VoiceResponse();
  twiml.say({ language: 'hi-IN' }, reply);
  twiml.gather({
    input: ['speech'],
    language: 'hi-IN',
    action: '/twilio/voice',
    method: 'POST'
  });

  res.type('text/xml').send(twiml.toString());
});
