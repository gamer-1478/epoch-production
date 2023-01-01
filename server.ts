import './env';
import { createServer } from 'http';
import { parse } from 'url';
import express from 'express';
import next from 'next';
import { spamInstagramDms, spamInstagramCommentsIfPublic } from './integrations/instagram';
import { spamTwitterPostRepliesIfPublic } from './integrations/twitter';
import { spamCall } from './integrations/call';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const app = express();

  app.get('/twitterPostReplies', async (req, res) => {
    res.send(await spamTwitterPostRepliesIfPublic("gamer_1478", 'hello sup ok'));
  });

  app.get('/instcommentspam', async (req, res) => {
    res.send(await spamInstagramCommentsIfPublic('beyonce', 'ohk'));
  })
  app.get('/instatest', async (req, res) => {
    res.send(await spamInstagramDms("sahiljainx30", "ohk"));
  });

  // app.get('/callTest', async (req, res) => {
  //   await spamCall('+919319705213', 'this is some generated text from gpt3');
  //   res.send('done');
  // });

  app.all('*', async (req, res) => {
    try {
      const parsedUrl = parse(req.url as any, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  createServer(app).listen(port, ((err: any) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  }) as any);
});
