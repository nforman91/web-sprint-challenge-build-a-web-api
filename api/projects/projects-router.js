// Write your "projects" router here!
const express = require('express');
const { validateProjectId } = require('../middleware/middleware');
const Projects = require('./projects-model');
const router = express.Router();

// [GET] /
router.get('/', (req, res, next) => {
    Projects.get()
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next);
});

// [GET] /:id
router.get('/:id', validateProjectId, (req, res, next) => {
    res.status(200).json(req.project);
});

// [POST] /
// router.post('/', (req, res) => {

// });

// [PUT] /:id
// router.put('/:id', (req, res) => {

// });

// [DELETE] /:id
// router.delete('/:id', (req, res) => {

// });

// [GET] /:id/actions
// router.get('/:id/actions', (req, res) => {

// });

module.exports = router;