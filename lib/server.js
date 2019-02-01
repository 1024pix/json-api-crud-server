const express = require('express');
const fortune = require('fortune');
const fortuneHTTP = require('fortune-http');
const jsonApiSerializer = require('fortune-json-api');

const options = require('./options');

const store = fortune(options.recordTypes, options);

const listener = fortuneHTTP(store, {
  serializers: [
    [
      jsonApiSerializer,
      fortuneHTTP.JsonSerializer
    ]
  ]
});

const server = express();

// Make sure that the Fortune listener is last in the middleware stack,
// since it ends the response by default (this can be optionally disabled).
server.use((request, response) =>
  listener(request, response)
    .catch((error) => {
      console.error(error.stack)
    }));

module.exports = server;