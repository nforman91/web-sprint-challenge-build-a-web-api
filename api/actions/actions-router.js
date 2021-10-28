// Write your "actions" router here!
const express = require('express');
const Actions = require('./actions-model');
const router = express.Router();

// [GET] /
router.get('/', (req, res, next) => {
    Actions.get()
        .then(action => {
            res.status(200).json(action)
        })
        .catch(next)
})

// [GET] /:id
// router.get('/:id', (req, res) => {

// })

// [POST] /
// router.post('/', (req, res) => {

// })

// [PUT] /:id
// router.put('/:id', (req, res) => {

// })

// [DELETE] /:id
// router.delete('/:id', (req, res) => {

// })

module.exports = router;