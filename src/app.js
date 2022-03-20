const express = require('express');
const logger = require('morgan');

const authRouter = require('./routes/auth');
const indexRouter = require('./routes/index');
const errors = require('./middleware/errors');

const app = express();
app
  .use(logger('combined'))
  // Parse JSON
  .use(express.json())
  // Enable routes
  .use('/', indexRouter)
  .use('/auth', authRouter)
  // Error middleware
  .use(errors);

module.exports = app;
