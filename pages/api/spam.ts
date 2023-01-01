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
import { CronJob } from 'cron';
import { spamSms } from '../../integrations/sms';

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

  let instanceNumber = 1;
  // get text from chat gpt 3
  const getResponse = () =>
    openai.createCompletion({
      model: 'text-davinci-003',
      prompt:
        `Write a somewhat rude message to the person for the ${instanceNumber} time belonging to the given personality. \n\nPersonality: "` +
        data.description +
        '" \n\nMessage: "',
      temperature: 0,
      max_tokens: 60,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

  const scheduledFn = async () => {
    const response = await getResponse();

    console.log({ response });

    // spam everywhere
    try {
      const promises = [];
      if (data.phone) {
        promises.push(spamCall(data.phone, response.data.choices[0].text!));
        promises.push(spamSms(data.phone, response.data.choices[0].text!));
      }
      if (data.twitter)
        promises.push(
          spamTwitterPostRepliesIfPublic(
            data.twitter,
            response.data.choices[0].text!
          )
        );
      if (data.instagram) {
        console.log('RUNNING INSTAGRAM');
        promises.push(
          spamInstagramDms(data.instagram, response.data.choices[0].text!)
        );
        promises.push(
          spamInstagramCommentsIfPublic(
            data.instagram,
            response.data.choices[0].text!
          )
        );
      }

      await Promise.all(promises);
      if (data.email) console.log('email spam not implemented yet');
    } catch (err) {
      console.error(err);
      console.log('unable to spam');
    }

    instanceNumber += 1;
  };

  await scheduledFn();

  const job = new CronJob('0 * * * *', scheduledFn, null, true);

  setTimeout(() => job.stop(), 1000 * 60 * 60 * 24);

  res.json({ message: 'User will be spammed' });
}
