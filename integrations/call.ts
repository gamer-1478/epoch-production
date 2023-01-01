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
    url: `https://spammm.mokshitjain.co/api/${audio.id}`,
    to: number,
    from: '+19804007835',
  });
}
