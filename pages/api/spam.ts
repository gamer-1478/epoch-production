import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth';
import prisma from '../../lib/db';
import { authOptions } from './auth/[...nextauth]';
import { spamTwitterPostRepliesIfPublic } from '../../integrations/twitter';
import {
  spamInstagramCommentsIfPublic,
  spamInstagramDms,
} from '../../integrations/instagram';
import { spamCall } from '../../integrations/call';
import { Configuration, OpenAIApi } from 'openai';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body as any;
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session?.user) return res.status(400).send('You are not logged in');

  await prisma.spammedUser.create({
    data: {
      description: data.description,
      name: data.name,
      email: data.email,
      phone: data.phone,
      instagram: data.instagram,
      twitter: data.twitter,
      spammedBy: { connect: { email: session.user.email! } },
    },
  });
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // get text from chat gpt 3
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt:
      'Write a somewhat rude message to the person belonging to the given personality. \n\nPersonality: "' +
      data.description +
      '" \n\nMessage: "',
    temperature: 0,
    max_tokens: 60,
    top_p: 1,
    frequency_penalty: 0.5,
    presence_penalty: 0,
  });

  // spam everywhere
  if (data.phone) spamCall(data.phone, response.data.choices[0].text!);
  if (data.twitter)
    spamTwitterPostRepliesIfPublic(
      response.data.choices[0].text!,
      data.twitter
    );
  if (data.instagram) {
    spamInstagramDms(response.data.choices[0].text!, data.instagram);
    spamInstagramCommentsIfPublic(
      response.data.choices[0].text!,
      data.instagram
    );
  }
  if (data.email) console.log('email spam not implemented yet');

  res.json({ message: 'User will be spammed' });
}
