// Write your "actions" router here!
const express = require('express');
const { validateActionId } = require('../middleware/middleware');
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
// router.post('/', (req, res) => {

// });

// [PUT] /:id
// router.put('/:id', validateActionId, (req, res) => {

// });

// [DELETE] /:id
// router.delete('/:id', validateActionId, (req, res) => {

// });

module.exports = router;