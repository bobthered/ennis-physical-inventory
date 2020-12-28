// libraries
import compression from 'compression';
import _ from 'dotenv/config';
import express from 'express';
import path from 'path';
import * as sapper from '@sapper/server';
import sirv from 'sirv';

// initiate express app;
const app = express();

console.log(path.join(__dirname, '../public'));

// express middleware
const server = app
  .use(
    compression({ threshold: 0 }),
    sirv('public', { dev: process.env.NODE_ENV === 'dev' }),
    express.json(),
    sapper.middleware(),
  )
  .listen(process.env.PORT || 5000, () => {
    console.log(`Listening at http://localhost:${process.env.PORT || 5000}`);
  });
