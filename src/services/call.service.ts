import { askBolna } from './bolna.service';
import Twilio from 'twilio';

const client = Twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function startCall(phone: string) {
  await client.calls.create({
    to: phone,
    from: process.env.TWILIO_FROM_NUMBER!,
    url: `${process.env.BASE_URL}/twilio/voice`
  });
}

export async function handleUserSpeech(callSid: string, speech: string) {
  const bolnaResponse = await askBolna(
    { callSid },
    speech || 'start'
  );

  return bolnaResponse.reply; // Hindi text
}
