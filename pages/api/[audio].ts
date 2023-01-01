import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../lib/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.audio;
  const audio = await prisma.audioFile.findUnique({
    where: {
      id: id as string,
    },
  });

  if (!audio) return res.status(404).send('File not found');

  return res.setHeader('Content-Type', 'application/xml').send(
    `
  <?xml version="1.0" encoding="UTF-8"?>
  <Response>
    <Say voice="alice">${audio.message}</Say>
  </Response>
  `.trim()
  );
}
