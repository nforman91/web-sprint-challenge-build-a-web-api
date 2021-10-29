require('dotenv').config();

const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
const actionsRouter = require('./actions/actions-router');
const projectsRouter = require('./projects/projects-router');

server.use(express.json());

const PORT = process.env.PORT || 5000;

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', (req, res) => {
    res.send(`<div>listening on port ${PORT}</div>`)
})

module.exports = server;
