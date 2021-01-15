// libraries
import compression from 'compression';
import _ from 'dotenv/config';
import express from 'express';
// import mongoose from 'mongoose';
import * as sapper from '@sapper/server';
import sirv from 'sirv';

import socketio from './socket.io/index.js';

// mongoose
// mongoose.connect(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

// initiate express app;
const app = express();

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

// socket.io setup
socketio(server);
