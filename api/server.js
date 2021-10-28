const express = require('express');
const { logger } = require('./middleware/middleware');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const actionsRouter = require('./actions/actions-router');

server.use(express.json());

server.use(logger);
server.use('/api/actions', actionsRouter);

module.exports = server;
