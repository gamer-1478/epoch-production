import twilio from 'twilio';
import prisma from '../lib/db';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

export async function spamCall(number: string, message: string) {
  const audio = await prisma.audioFile.create({
    data: { message },
  });

  const call = await client.calls.create({
    url: `https://c6a4-49-249-72-18.ngrok.io/api/${audio.id}`,
    to: number,
    from: '+19804007835',
  });
}
