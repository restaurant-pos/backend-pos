'use strict';

const express = require('express');
const debug = require('debug');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const errors = require('./lib/err-middleware.js');

dotenv.load();

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI);

app
  .use(cors({
    origin: process.env.CORS_ORIGINS,
    credentials: true,
  }))
  .use(morgan('dev'))
  .use(errors);

const server = module.exports = app.listen(PORT, () => {
  debug(`Server listening on ${PORT}`);
});

server.isRunning = true;