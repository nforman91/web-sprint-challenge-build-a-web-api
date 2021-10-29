// Write your "actions" router here!
const express = require('express');
const { validateActionId, validateAction } = require('./actions-middlware');
const Actions = require('./actions-model');
const router = express.Router();

// [GET] /
router.get('/', (req, res, next) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next);
});

// [GET] /:id
router.get('/:id', validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

// [POST] /
router.post('/', validateAction, (req, res, next) => {
    const actionInfo = {...req.body, project_id: req.params.id};

    Actions.insert(actionInfo)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(next);
});

// [PUT] /:id
router.put('/:id', validateActionId, validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then(() => {
            return Actions.get(req.params.id);
        })
        .then(action => {
            res.status(200).json(action);
        })
        .catch(next);
});

// [DELETE] /:id
router.delete('/:id', validateActionId, (req, res, next) => {
    Actions.remove(req.params.id)
        .then(() => {
            res.status(200).json(req.action)
        })
        .catch(next)
});

module.exports = router;