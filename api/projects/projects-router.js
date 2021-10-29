// Write your "projects" router here!
const express = require('express');
const { validateProjectId, validateProject } = require('./projects-middleware');
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
router.get('/:id', validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

// [POST] /
router.post('/', validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(next);
});

// [PUT] /:id
router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then(() => {
            return Projects.get(req.params.id);
        })
        .then(project => {
            res.status(200).json(project);
        })
        .catch(next);
});

// [DELETE] /:id
router.delete('/:id', validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.project)
        })
        .catch(next)
});

// [GET] /:id/actions
router.get('/:id/actions', validateProjectId, (req, res, next) => {
    Projects.getProjectActions(req.params.id)
        .then(project => {
            res.status(200).json(project)
        })
        .catch(next)
});

module.exports = router;