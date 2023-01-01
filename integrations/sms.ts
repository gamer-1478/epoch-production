import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

export async function spamSms(number: string, text: string) {
  const message = await client.messages.create({
    body: text,
    from: '+19804007835',
    to: number,
  });

  console.log(message.sid);
}
