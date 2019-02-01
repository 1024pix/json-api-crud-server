#!/usr/bin/env node

// As early as possible in your application, require and configure dotenv.
// https://www.npmjs.com/package/dotenv#usage
require('dotenv').config();

const environment = require('./config/environment');

const server = require('./lib/server');

server.listen(environment.port, () => {
  console.log(`Server is up and running at: http://localhost:${environment.port}`)
});
